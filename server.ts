import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

// Production is determined strictly by NODE_ENV === 'production' or running the compiled production bundle
const isProduction =
  process.env.NODE_ENV === 'production' ||
  (process.env.NODE_ENV !== 'development' &&
    typeof __filename !== 'undefined' &&
    (__filename.endsWith('.cjs') || __filename.endsWith('.js')));

// The dev server and Nginx reverse proxy communicate over port 3000.
// Cloud Run injects PORT=8080 where Nginx listens, so app server must listen on port 3000.
const rawPort = parseInt(process.env.PORT || '3000', 10);
const PORT = rawPort === 8080 || !isProduction ? 3000 : rawPort;
const SESSION_COOKIE_NAME = 'admin_session';

// Process-level crash prevention to ensure connections are never dropped unexpectedly (Cloudflare 520/521)
process.on('unhandledRejection', (reason) => {
  console.error('[Process] Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('[Process] Uncaught Exception:', err);
});

// Helper to retrieve and validate admin environment variables dynamically on each request
function getAdminConfig(): {
  configured: boolean;
  error?: string;
  email?: string;
  password?: string;
  sessionSecret?: string;
} {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.SESSION_SECRET;

  const missing: string[] = [];
  if (!email) missing.push('ADMIN_EMAIL');
  if (!password) missing.push('ADMIN_PASSWORD');
  if (!sessionSecret) missing.push('SESSION_SECRET');

  if (missing.length > 0) {
    return {
      configured: false,
      error: `Server Configuration Error: Missing required admin environment variables (${missing.join(
        ', '
      )}). Please set ADMIN_EMAIL, ADMIN_PASSWORD, and SESSION_SECRET in your environment variables or .env file.`
    };
  }

  return {
    configured: true,
    email: email!,
    password: password!,
    sessionSecret: sessionSecret!
  };
}

// Rate-limiting tracker for login attempts (IP -> { attempts, lockedUntil })
interface RateLimitInfo {
  attempts: number;
  lockedUntil: number;
}
const loginAttempts = new Map<string, RateLimitInfo>();

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(req: Request): string {
  // Support Cloudflare connecting IP header first
  const cfIp = req.headers['cf-connecting-ip'];
  if (typeof cfIp === 'string' && cfIp.trim()) {
    return cfIp.trim();
  }
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown-ip';
}

// Generate an HMAC signature for a payload
function signToken(payload: string, secret: string): string {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  return hmac.digest('hex');
}

// Create a cryptographically signed stateless session token
function createSessionToken(
  email: string,
  role: string,
  secret: string
): { token: string; csrfToken: string; expiresAt: number } {
  const sessionId = crypto.randomBytes(24).toString('hex');
  const csrfToken = crypto.randomBytes(24).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  const payload = JSON.stringify({ sessionId, email, role, expiresAt, csrfToken });
  const signature = signToken(payload, secret);
  const token = Buffer.from(payload).toString('base64url') + '.' + signature;

  return { token, csrfToken, expiresAt };
}

// Verify a stateless session token
function verifySessionToken(
  token: string,
  secret: string
): { valid: boolean; email?: string; role?: string; csrfToken?: string; sessionId?: string } {
  if (!token || typeof token !== 'string') {
    return { valid: false };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false };
  }

  const [encodedPayload, receivedSig] = parts;
  let payloadStr: string;
  try {
    payloadStr = Buffer.from(encodedPayload, 'base64url').toString('utf8');
  } catch {
    return { valid: false };
  }

  const expectedSig = signToken(payloadStr, secret);
  const sigBuffer = Buffer.from(receivedSig);
  const expectedBuffer = Buffer.from(expectedSig);

  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return { valid: false };
  }

  try {
    const data = JSON.parse(payloadStr);
    if (!data.sessionId || !data.expiresAt || !data.email || !data.role || !data.csrfToken) {
      return { valid: false };
    }

    if (Date.now() > data.expiresAt) {
      return { valid: false };
    }

    return { valid: true, email: data.email, role: data.role, csrfToken: data.csrfToken, sessionId: data.sessionId };
  } catch {
    return { valid: false };
  }
}

// Constant-time password comparison
function verifyPassword(candidate: string, expected: string): boolean {
  if (!candidate || !expected) return false;

  // If password stored is bcrypt hash
  if (expected.startsWith('$2a$') || expected.startsWith('$2b$') || expected.startsWith('$2y$')) {
    try {
      return bcrypt.compareSync(candidate, expected);
    } catch {
      return false;
    }
  }

  // Timing-safe buffer comparison for plain string env password
  const candBuf = Buffer.from(candidate, 'utf8');
  const expBuf = Buffer.from(expected, 'utf8');
  if (candBuf.length !== expBuf.length) {
    crypto.timingSafeEqual(candBuf, candBuf);
    return false;
  }
  return crypto.timingSafeEqual(candBuf, expBuf);
}

// Authentication middleware
function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const config = getAdminConfig();
  if (!config.configured || !config.sessionSecret) {
    res.status(401).json({ error: 'Unauthorized: Admin authentication is not configured in server environment variables', authenticated: false });
    return;
  }

  const token = req.cookies?.[SESSION_COOKIE_NAME];
  const auth = verifySessionToken(token, config.sessionSecret);

  if (!auth.valid || auth.role !== 'admin') {
    res.status(401).json({ error: 'Unauthorized: Admin authentication required', authenticated: false });
    return;
  }

  // Check CSRF for mutating requests
  const mutatingMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
  if (mutatingMethods.includes(req.method.toUpperCase())) {
    const clientCsrf = req.headers['x-csrf-token'] || req.body?.csrfToken;
    if (!clientCsrf || clientCsrf !== auth.csrfToken) {
      res.status(403).json({ error: 'Forbidden: Invalid or missing CSRF token' });
      return;
    }
  }

  (req as any).adminSession = auth;
  next();
}

// Suspicious/scanner/exploit path patterns to reject immediately with 404 (prevents 5xx and unnecessary SPA fallbacks)
const BLOCKED_PATH_PATTERNS = [
  // Hidden files and sensitive directories
  /\/\.(env|git|svn|ds_store|htaccess|htpasswd|aws|ssh|docker|local|vscode|idea|cache)/i,
  /^\/\.(?!well-known\/).+/i,
  // Common scanner probes, scripts, backups, configs, and archives
  /\.(php|asp|aspx|jsp|cgi|pl|sh|bash|sql|bak|old|swp|conf|ya?ml|ini|cfg|env|tar|gz|zip|rar|7z|log)$/i,
  // Known exploit probes (WordPress, databases, management endpoints)
  /\/(wp-admin|wp-includes|wp-content|wp-login|xmlrpc|phpmyadmin|adminer|actuator|console|cgi-bin|solr|telescope|webconsole|invoker|jmx-console|phpinfo|myadmin|pma)/i,
  // Source files, build tools, lockfiles, and server configuration
  /\/(package\.json|package-lock\.json|bun\.lock|tsconfig\.json|vite\.config\.ts|server\.ts|server\.js|server\.cjs(\.map)?|metadata\.json|_headers|_redirects)$/i,
  // Path traversal sequences
  /(\.\.[\/\\]|%2e%2e)/i
];

async function startServer() {
  const app = express();

  // Enable reverse proxy trust (Cloudflare CDN / Cloud Run)
  app.set('trust proxy', true);

  // 1. Pre-routing URI Validation Middleware (catches malformed URI encoding & null bytes before Express router)
  app.use((req: Request, res: Response, next: NextFunction) => {
    try {
      decodeURI(req.url);
      const decodedPath = decodeURIComponent(req.path);
      if (decodedPath.includes('\0') || req.url.includes('\0')) {
        res.status(400).send('Bad Request');
        return;
      }
      next();
    } catch {
      // Malformed percent-encoding like /%ff or /%c0%af returns 400 Bad Request instead of unhandled 5xx
      res.status(400).send('Bad Request');
    }
  });

  // 2. Immediate Block for Scanner / Exploit / Server Files (returns proper 404 instead of 5xx or SPA fallback)
  app.use((req: Request, res: Response, next: NextFunction) => {
    const reqPath = req.path;
    for (const pattern of BLOCKED_PATH_PATTERNS) {
      if (pattern.test(reqPath)) {
        res.status(404).send('Not Found');
        return;
      }
    }
    next();
  });

  // 3. Basic security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // 4. Body and cookie parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // 5. Health check endpoint (for Cloudflare / host liveness checks)
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // --- Admin Authentication Routes ---

  // Check current session: Returns 200 with authenticated: false if unconfigured or unauthenticated (prevents 5xx errors)
  app.get('/api/admin/session', (req, res) => {
    const config = getAdminConfig();
    if (!config.configured || !config.sessionSecret) {
      res.status(200).json({
        authenticated: false,
        configured: false,
        message: 'Admin authentication is not configured in environment variables'
      });
      return;
    }

    const token = req.cookies?.[SESSION_COOKIE_NAME];
    const auth = verifySessionToken(token, config.sessionSecret);

    if (auth.valid && auth.role === 'admin') {
      res.json({
        authenticated: true,
        user: { email: auth.email, role: auth.role },
        csrfToken: auth.csrfToken
      });
    } else {
      res.status(200).json({
        authenticated: false,
        message: 'No active admin session'
      });
    }
  });

  // Admin Login
  app.post('/api/admin/login', (req, res) => {
    const config = getAdminConfig();
    if (!config.configured || !config.email || !config.password || !config.sessionSecret) {
      res.status(400).json({ error: 'Admin authentication is not configured in server environment variables.' });
      return;
    }

    const clientIp = getClientIp(req);
    const now = Date.now();

    // Check rate limiting
    const rateLimit = loginAttempts.get(clientIp);
    if (rateLimit && rateLimit.lockedUntil > now) {
      const waitMinutes = Math.ceil((rateLimit.lockedUntil - now) / (60 * 1000));
      res.status(429).json({
        error: `Too many failed login attempts. Account access is temporarily locked for security. Please try again in ${waitMinutes} minute(s).`
      });
      return;
    }

    const { email, password } = req.body || {};

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const isEmailValid = normalizedEmail === config.email;
    const isPasswordValid = verifyPassword(password, config.password);

    if (!isEmailValid || !isPasswordValid) {
      // Record failed attempt
      const currentAttempts = (rateLimit?.attempts || 0) + 1;
      let lockedUntil = 0;
      if (currentAttempts >= MAX_LOGIN_ATTEMPTS) {
        lockedUntil = now + LOCKOUT_DURATION_MS;
      }
      loginAttempts.set(clientIp, { attempts: currentAttempts, lockedUntil });

      const remainingAttempts = Math.max(0, MAX_LOGIN_ATTEMPTS - currentAttempts);
      const warningMessage =
        remainingAttempts > 0
          ? `Invalid admin credentials. (${remainingAttempts} attempt(s) remaining before temporary lockout)`
          : 'Too many failed login attempts. Account access is temporarily locked for 15 minutes.';

      res.status(401).json({ error: warningMessage });
      return;
    }

    // Reset rate limiter on successful authentication
    loginAttempts.delete(clientIp);

    // Create stateless session
    const { token, csrfToken } = createSessionToken(normalizedEmail, 'admin', config.sessionSecret);

    // Set secure HttpOnly cookie
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/'
    });

    res.json({
      success: true,
      message: 'Admin authentication successful',
      user: { email: normalizedEmail, role: 'admin' },
      csrfToken
    });
  });

  // Admin Logout
  app.post('/api/admin/logout', (req, res) => {
    res.clearCookie(SESSION_COOKIE_NAME, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });

    res.json({ success: true, message: 'Logged out successfully' });
  });

  // Protected Admin Verification endpoint (supports GET and POST)
  app.all('/api/admin/verify', requireAdminAuth, (req, res) => {
    const session = (req as any).adminSession;
    res.json({
      success: true,
      user: { email: session.email, role: session.role }
    });
  });

  // Explicit ads.txt endpoint for Google AdSense crawler verification
  app.get('/ads.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.send('google.com, pub-2683919410645700, DIRECT, f08c47fec0942fa0\n');
  });

  // Explicit robots.txt endpoint for Googlebot, Mediapartners-Google, and Bingbot
  app.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    const robotsPath = fs.existsSync(path.join(process.cwd(), 'dist', 'robots.txt'))
      ? path.join(process.cwd(), 'dist', 'robots.txt')
      : path.join(process.cwd(), 'public', 'robots.txt');

    if (fs.existsSync(robotsPath)) {
      res.send(fs.readFileSync(robotsPath, 'utf8'));
    } else {
      res.status(404).send('robots.txt not found');
    }
  });

  // Explicit sitemap.xml endpoint for Google Search Console and web crawlers (no redirects, valid XML)
  app.get('/sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    const sitemapPath = fs.existsSync(path.join(process.cwd(), 'dist', 'sitemap.xml'))
      ? path.join(process.cwd(), 'dist', 'sitemap.xml')
      : path.join(process.cwd(), 'public', 'sitemap.xml');

    if (fs.existsSync(sitemapPath)) {
      let xml = fs.readFileSync(sitemapPath, 'utf8');
      const host = (req.headers['x-forwarded-host'] || req.headers.host || '').toString().toLowerCase();
      // If requested from custom domain aitoolnest.com, dynamically rewrite the URLs to match the domain
      if (host.includes('aitoolnest.com')) {
        xml = xml.replace(/https:\/\/aitoolnest-web\.pages\.dev/g, 'https://aitoolnest.com');
      }
      res.send(xml);
    } else {
      res.status(404).send('sitemap.xml not found');
    }
  });

  // Explicit feed.xml and rss.xml endpoints
  app.get(['/feed.xml', '/rss.xml'], (req, res) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    const fileName = req.path.includes('rss') ? 'rss.xml' : 'feed.xml';
    const filePath = fs.existsSync(path.join(process.cwd(), 'dist', fileName))
      ? path.join(process.cwd(), 'dist', fileName)
      : path.join(process.cwd(), 'public', fileName);

    if (fs.existsSync(filePath)) {
      res.send(fs.readFileSync(filePath, 'utf8'));
    } else {
      res.status(404).send('Feed not found');
    }
  });

  // Unknown API routes return proper 404 JSON rather than falling through to HTML SPA
  app.all('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
  });

  // Vite middleware for development vs static build in production
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.join(process.cwd(), 'dist'))
      ? path.join(process.cwd(), 'dist')
      : path.resolve(__dirname);
    const indexHtmlPath = path.join(distPath, 'index.html');

    // Serve static files from dist directory with controlled options
    app.use(
      express.static(distPath, {
        index: false,
        dotfiles: 'ignore',
        fallthrough: true,
        maxAge: '1d'
      })
    );

    // Missing assets under /assets return 404 rather than serving index.html
    app.use('/assets', (req, res) => {
      res.status(404).send('Asset Not Found');
    });

    // Any missing static file with an extension returns 404 rather than serving index.html
    app.use((req, res, next) => {
      if (path.extname(req.path)) {
        res.status(404).send('Not Found');
        return;
      }
      next();
    });

    // SPA HTML Fallback for GET and HEAD requests only
    app.get('*', (req, res) => {
      res.sendFile(indexHtmlPath, (err) => {
        if (err && !res.headersSent) {
          res.status(404).send('Not Found');
        }
      });
    });

    // Catch all other HTTP methods on non-API routes
    app.all('*', (req, res) => {
      res.status(404).send('Not Found');
    });
  }

  // Global Express error handler to guarantee no unhandled error produces an unexpected 5xx crash
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const status = err?.status || err?.statusCode;

    // Handle bad request / parsing / URI errors
    if (err instanceof URIError || status === 400 || err?.type === 'entity.parse.failed') {
      res.status(400).json({ error: 'Bad Request' });
      return;
    }

    // Handle not found errors
    if (err?.code === 'ENOENT' || status === 404) {
      res.status(404).send('Not Found');
      return;
    }

    // Preserve valid 4xx client errors from any middleware
    if (typeof status === 'number' && status >= 400 && status < 500) {
      res.status(status).json({ error: err.message || 'Client Error' });
      return;
    }

    console.error('[ServerError]', err?.message || err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ AIToolNest Server running securely on http://0.0.0.0:${PORT}`);
  });

  // Cloudflare reverse proxy keep-alive and timeout configuration
  // Cloudflare default idle keep-alive timeout is ~60 seconds.
  // The origin keepAliveTimeout MUST exceed Cloudflare's 60s timeout to prevent Cloudflare 520 (abrupt TCP close race).
  server.keepAliveTimeout = 65000; // 65 seconds
  server.headersTimeout = 66000; // 66 seconds (must be > keepAliveTimeout)
  server.requestTimeout = 120000; // 120 seconds
}

startServer();
