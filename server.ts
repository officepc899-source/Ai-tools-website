import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const PORT = 3000;
const SESSION_COOKIE_NAME = 'admin_session';

// Admin configuration from environment variables - NO hardcoded fallback credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;

function checkAdminConfig(): { configured: boolean; error?: string } {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !SESSION_SECRET) {
    const missing: string[] = [];
    if (!ADMIN_EMAIL) missing.push('ADMIN_EMAIL');
    if (!ADMIN_PASSWORD) missing.push('ADMIN_PASSWORD');
    if (!SESSION_SECRET) missing.push('SESSION_SECRET');
    return {
      configured: false,
      error: `Server Configuration Error: Missing required admin environment variables (${missing.join(
        ', '
      )}). For production on Cloudflare Pages, configure these in Cloudflare Pages Settings > Environment Variables. For local development, set them in .env.`
    };
  }
  return { configured: true };
}

// Rate-limiting tracker for local dev login attempts (IP -> { attempts, lockedUntil })
interface RateLimitInfo {
  attempts: number;
  lockedUntil: number;
}
const loginAttempts = new Map<string, RateLimitInfo>();

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(req: Request): string {
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
function createSessionToken(email: string, role: string, secret: string): { token: string; csrfToken: string; expiresAt: number } {
  const sessionId = crypto.randomBytes(24).toString('hex');
  const csrfToken = crypto.randomBytes(24).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  const payload = JSON.stringify({ sessionId, email, role, expiresAt, csrfToken });
  const signature = signToken(payload, secret);
  const token = Buffer.from(payload).toString('base64url') + '.' + signature;

  return { token, csrfToken, expiresAt };
}

// Verify a stateless session token
function verifySessionToken(token: string, secret: string): { valid: boolean; email?: string; role?: string; csrfToken?: string; sessionId?: string } {
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
  const config = checkAdminConfig();
  if (!config.configured || !SESSION_SECRET) {
    res.status(500).json({ error: config.error || 'Server configuration error' });
    return;
  }

  const token = req.cookies?.[SESSION_COOKIE_NAME];
  const auth = verifySessionToken(token, SESSION_SECRET);

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

async function startServer() {
  const app = express();

  // Basic security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  // Body and cookie parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser(SESSION_SECRET));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // --- Admin Authentication Routes ---

  // Check current session
  app.get('/api/admin/session', (req, res) => {
    const config = checkAdminConfig();
    if (!config.configured || !SESSION_SECRET) {
      res.status(500).json({ error: config.error || 'Server configuration error', authenticated: false });
      return;
    }

    const token = req.cookies?.[SESSION_COOKIE_NAME];
    const auth = verifySessionToken(token, SESSION_SECRET);

    if (auth.valid && auth.role === 'admin') {
      res.json({
        authenticated: true,
        user: { email: auth.email, role: auth.role },
        csrfToken: auth.csrfToken
      });
    } else {
      res.status(401).json({
        authenticated: false,
        message: 'No valid admin session'
      });
    }
  });

  // Admin Login
  app.post('/api/admin/login', (req, res) => {
    const config = checkAdminConfig();
    if (!config.configured || !ADMIN_EMAIL || !ADMIN_PASSWORD || !SESSION_SECRET) {
      res.status(500).json({ error: config.error || 'Server configuration error' });
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
    const isEmailValid = normalizedEmail === ADMIN_EMAIL;
    const isPasswordValid = verifyPassword(password, ADMIN_PASSWORD);

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
    const { token, csrfToken } = createSessionToken(normalizedEmail, 'admin', SESSION_SECRET);

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
    res.send('google.com, pub-2683919410645700, DIRECT, f08c47fec0942fa0\n');
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ AIToolNest Server running securely on http://0.0.0.0:${PORT}`);
  });
}

startServer();
