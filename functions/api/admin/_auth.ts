import bcrypt from 'bcryptjs';

export interface Env {
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD?: string;
  SESSION_SECRET?: string;
  RATE_LIMIT_KV?: {
    get: (key: string, type?: 'text' | 'json') => Promise<any>;
    put: (key: string, value: string, options?: { expirationTtl?: number }) => Promise<void>;
    delete: (key: string) => Promise<void>;
  };
  KV?: {
    get: (key: string, type?: 'text' | 'json') => Promise<any>;
    put: (key: string, value: string, options?: { expirationTtl?: number }) => Promise<void>;
    delete: (key: string) => Promise<void>;
  };
  [key: string]: any;
}

export const SESSION_COOKIE_NAME = 'admin_session';
export const RATE_LIMIT_COOKIE_NAME = 'admin_rl';
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export interface SessionPayload {
  email: string;
  role: 'admin';
  csrfToken: string;
  iat: number;
  exp: number;
}

export interface AdminConfig {
  error?: string;
  adminEmail?: string;
  adminPassword?: string;
  sessionSecret?: string;
}

export interface EventContext<E = Env> {
  request: Request;
  env: E;
  params: Record<string, string | string[]>;
  waitUntil: (promise: Promise<any>) => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  data: Record<string, any>;
}

export type PagesFunction<E = Env> = (
  context: EventContext<E>
) => Response | Promise<Response>;

/**
 * Validates that all required server-side secrets are configured.
 * Does NOT fall back to insecure default passwords in production.
 */
export function getAdminConfig(env: Env): AdminConfig {
  const adminEmail = env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = env.ADMIN_PASSWORD;
  const sessionSecret = env.SESSION_SECRET;

  if (!adminEmail || !adminPassword || !sessionSecret) {
    const missing: string[] = [];
    if (!adminEmail) missing.push('ADMIN_EMAIL');
    if (!adminPassword) missing.push('ADMIN_PASSWORD');
    if (!sessionSecret) missing.push('SESSION_SECRET');

    return {
      error: `Server Configuration Error: Missing required admin environment variables (${missing.join(
        ', '
      )}) in Cloudflare Pages. Please set these in Cloudflare Pages Dashboard -> Settings -> Environment variables.`
    };
  }

  return { adminEmail, adminPassword, sessionSecret };
}

export function bufferToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function base64UrlToBuffer(base64Url: string): Uint8Array {
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function signHmacSha256(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBuffer = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return bufferToBase64Url(new Uint8Array(sigBuffer));
}

export async function verifyHmacSha256(
  data: string,
  signatureBase64Url: string,
  secret: string
): Promise<boolean> {
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    const sigBytes = base64UrlToBuffer(signatureBase64Url);
    return await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(data));
  } catch {
    return false;
  }
}

export async function createSessionToken(
  email: string,
  role: 'admin',
  secret: string
): Promise<{ token: string; csrfToken: string; expiresAt: number }> {
  const csrfToken = crypto.randomUUID().replace(/-/g, '');
  const now = Date.now();
  const expiresAt = now + 24 * 60 * 60 * 1000; // 24 hours

  const payload: SessionPayload = {
    email,
    role,
    csrfToken,
    iat: now,
    exp: expiresAt
  };

  const payloadStr = JSON.stringify(payload);
  const encodedPayload = bufferToBase64Url(new TextEncoder().encode(payloadStr));
  const signature = await signHmacSha256(encodedPayload, secret);
  const token = `${encodedPayload}.${signature}`;

  return { token, csrfToken, expiresAt };
}

export async function verifySessionToken(
  token: string,
  secret: string
): Promise<SessionPayload | null> {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encodedPayload, receivedSig] = parts;
  if (!encodedPayload || !receivedSig) return null;

  const isValidSig = await verifyHmacSha256(encodedPayload, receivedSig, secret);
  if (!isValidSig) return null;

  try {
    const jsonBytes = base64UrlToBuffer(encodedPayload);
    const jsonStr = new TextDecoder().decode(jsonBytes);
    const payload = JSON.parse(jsonStr) as SessionPayload;

    if (!payload.email || payload.role !== 'admin' || !payload.exp || !payload.csrfToken) {
      return null;
    }

    if (Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function verifyPassword(candidate: string, expected: string): Promise<boolean> {
  if (!candidate || !expected) return false;

  // If password stored is bcrypt hash
  if (expected.startsWith('$2a$') || expected.startsWith('$2b$') || expected.startsWith('$2y$')) {
    try {
      return await bcrypt.compare(candidate, expected);
    } catch {
      return false;
    }
  }

  // Constant-time compare for plain text password
  const enc = new TextEncoder();
  const candBytes = enc.encode(candidate);
  const expBytes = enc.encode(expected);

  let diff = candBytes.length ^ expBytes.length;
  const len = Math.max(candBytes.length, expBytes.length);
  for (let i = 0; i < len; i++) {
    const b1 = i < candBytes.length ? candBytes[i] : 0;
    const b2 = i < expBytes.length ? expBytes[i] : 0;
    diff |= b1 ^ b2;
  }
  return diff === 0;
}

export function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  const cookies: Record<string, string> = {};
  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const eqIdx = part.indexOf('=');
    if (eqIdx !== -1) {
      const key = part.slice(0, eqIdx).trim();
      const val = part.slice(eqIdx + 1).trim();
      try {
        cookies[key] = decodeURIComponent(val);
      } catch {
        cookies[key] = val;
      }
    }
  }
  return cookies;
}

export function createSetCookieHeader(
  name: string,
  value: string,
  options: {
    maxAge?: number;
    path?: string;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'Lax' | 'Strict' | 'None';
  } = {}
): string {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  if (options.maxAge !== undefined) {
    parts.push(`Max-Age=${options.maxAge}`);
  }
  parts.push(`Path=${options.path || '/'}`);
  if (options.httpOnly !== false) {
    parts.push('HttpOnly');
  }
  if (options.secure) {
    parts.push('Secure');
  }
  parts.push(`SameSite=${options.sameSite || 'Lax'}`);
  return parts.join('; ');
}

export function createClearCookieHeader(
  name: string,
  options: { path?: string; secure?: boolean; sameSite?: 'Lax' | 'Strict' | 'None' } = {}
): string {
  const parts = [`${name}=`];
  parts.push('Max-Age=0');
  parts.push('Expires=Thu, 01 Jan 1970 00:00:00 GMT');
  parts.push(`Path=${options.path || '/'}`);
  parts.push('HttpOnly');
  if (options.secure) {
    parts.push('Secure');
  }
  parts.push(`SameSite=${options.sameSite || 'Lax'}`);
  return parts.join('; ');
}

export async function getSessionFromRequest(
  request: Request,
  secret: string
): Promise<SessionPayload | null> {
  const cookieHeader = request.headers.get('Cookie') || request.headers.get('cookie');
  const cookies = parseCookies(cookieHeader);
  const sessionToken = cookies[SESSION_COOKIE_NAME];
  if (!sessionToken) return null;
  return await verifySessionToken(sessionToken, secret);
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    '127.0.0.1'
  );
}

export async function hashIp(ip: string, secret: string): Promise<string> {
  return await signHmacSha256(`ip:${ip}`, secret);
}

interface RateLimitTokenPayload {
  ipHash: string;
  attempts: number;
  lockedUntil: number;
  timestamp: number;
}

export async function checkRateLimit(
  request: Request,
  env: Env,
  secret: string
): Promise<{ allowed: boolean; waitMinutes?: number; attempts: number }> {
  const clientIp = getClientIp(request);
  const now = Date.now();

  // 1. Check KV if available in Cloudflare Pages
  const kv = env.RATE_LIMIT_KV || env.KV;
  if (kv) {
    try {
      const data = await kv.get(`rl:${clientIp}`, 'json');
      if (data && typeof data === 'object') {
        if (data.lockedUntil && data.lockedUntil > now) {
          const waitMinutes = Math.ceil((data.lockedUntil - now) / (60 * 1000));
          return { allowed: false, waitMinutes, attempts: data.attempts || MAX_LOGIN_ATTEMPTS };
        }
        return { allowed: true, attempts: data.attempts || 0 };
      }
    } catch {
      // Fall through to signed cookie check
    }
  }

  // 2. Check signed rate-limit cookie (serverless stateless fallback)
  const cookieHeader = request.headers.get('Cookie') || request.headers.get('cookie');
  const cookies = parseCookies(cookieHeader);
  const rlCookie = cookies[RATE_LIMIT_COOKIE_NAME];

  if (rlCookie) {
    const parts = rlCookie.split('.');
    if (parts.length === 2) {
      const [payloadEnc, sig] = parts;
      const isValid = await verifyHmacSha256(payloadEnc, sig, secret);
      if (isValid) {
        try {
          const jsonBytes = base64UrlToBuffer(payloadEnc);
          const data = JSON.parse(new TextDecoder().decode(jsonBytes)) as RateLimitTokenPayload;
          const currentIpHash = await hashIp(clientIp, secret);

          if (data.ipHash === currentIpHash) {
            if (data.lockedUntil > now) {
              const waitMinutes = Math.ceil((data.lockedUntil - now) / (60 * 1000));
              return { allowed: false, waitMinutes, attempts: data.attempts };
            }
            if (now - data.timestamp < LOCKOUT_DURATION_MS) {
              return { allowed: true, attempts: data.attempts };
            }
          }
        } catch {
          // Ignore parse errors
        }
      }
    }
  }

  return { allowed: true, attempts: 0 };
}

export async function recordFailedLoginAttempt(
  request: Request,
  env: Env,
  secret: string,
  previousAttempts: number
): Promise<{ remainingAttempts: number; rateLimitCookie: string }> {
  const clientIp = getClientIp(request);
  const now = Date.now();
  const attempts = previousAttempts + 1;
  let lockedUntil = 0;

  if (attempts >= MAX_LOGIN_ATTEMPTS) {
    lockedUntil = now + LOCKOUT_DURATION_MS;
  }

  // Save to KV if configured
  const kv = env.RATE_LIMIT_KV || env.KV;
  if (kv) {
    try {
      await kv.put(
        `rl:${clientIp}`,
        JSON.stringify({ attempts, lockedUntil, updatedAt: now }),
        { expirationTtl: 900 }
      );
    } catch {
      // Ignore
    }
  }

  // Generate cryptographically signed rate-limit cookie
  const ipHash = await hashIp(clientIp, secret);
  const payload: RateLimitTokenPayload = {
    ipHash,
    attempts,
    lockedUntil,
    timestamp: now
  };
  const payloadStr = JSON.stringify(payload);
  const encodedPayload = bufferToBase64Url(new TextEncoder().encode(payloadStr));
  const sig = await signHmacSha256(encodedPayload, secret);
  const token = `${encodedPayload}.${sig}`;

  const url = new URL(request.url);
  const isSecure = url.protocol === 'https:';

  const rateLimitCookie = createSetCookieHeader(RATE_LIMIT_COOKIE_NAME, token, {
    maxAge: 900,
    path: '/api/admin',
    httpOnly: true,
    secure: isSecure,
    sameSite: 'Lax'
  });

  const remainingAttempts = Math.max(0, MAX_LOGIN_ATTEMPTS - attempts);
  return { remainingAttempts, rateLimitCookie };
}

export async function clearRateLimit(
  request: Request,
  env: Env,
  secret: string
): Promise<string | null> {
  const clientIp = getClientIp(request);
  const kv = env.RATE_LIMIT_KV || env.KV;
  if (kv) {
    try {
      await kv.delete(`rl:${clientIp}`);
    } catch {
      // Ignore
    }
  }

  const url = new URL(request.url);
  const isSecure = url.protocol === 'https:';

  return createClearCookieHeader(RATE_LIMIT_COOKIE_NAME, {
    path: '/api/admin',
    secure: isSecure,
    sameSite: 'Lax'
  });
}

export function verifyCsrf(request: Request, session: SessionPayload, body?: any): boolean {
  const clientCsrf =
    request.headers.get('x-csrf-token') ||
    request.headers.get('X-CSRF-Token') ||
    body?.csrfToken;
  if (!clientCsrf || !session.csrfToken) {
    return false;
  }
  return clientCsrf === session.csrfToken;
}

export function jsonResponse(data: any, status = 200, headersInit?: HeadersInit): Response {
  const headers = new Headers(headersInit);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json; charset=utf-8');
  }
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return new Response(JSON.stringify(data), {
    status,
    headers
  });
}
