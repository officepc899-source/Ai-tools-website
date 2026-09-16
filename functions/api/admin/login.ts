import {
  Env,
  PagesFunction,
  getAdminConfig,
  verifyPassword,
  createSessionToken,
  checkRateLimit,
  recordFailedLoginAttempt,
  clearRateLimit,
  createSetCookieHeader,
  SESSION_COOKIE_NAME,
  jsonResponse
} from './_auth';

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Allow': 'POST, OPTIONS',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
      'Access-Control-Allow-Credentials': 'true'
    }
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // 1. Verify Cloudflare Pages environment configuration
  const config = getAdminConfig(env);
  if (config.error || !config.adminEmail || !config.adminPassword || !config.sessionSecret) {
    return jsonResponse(
      { error: config.error || 'Server configuration error' },
      500
    );
  }

  // 2. Check rate limiting (stateless cookie + Cloudflare KV compatible)
  const rateLimitResult = await checkRateLimit(request, env, config.sessionSecret);
  if (!rateLimitResult.allowed) {
    return jsonResponse(
      {
        error: `Too many failed login attempts. Account access is temporarily locked for security. Please try again in ${rateLimitResult.waitMinutes} minute(s).`
      },
      429
    );
  }

  // 3. Parse credentials from body
  let body: any;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON request payload' }, 400);
  }

  const { email, password } = body || {};
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return jsonResponse({ error: 'Email and password are required' }, 400);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const isEmailValid = normalizedEmail === config.adminEmail;
  const isPasswordValid = await verifyPassword(password, config.adminPassword);

  console.log("[ADMIN AUTH DEBUG]", JSON.stringify({
    emailMatch: isEmailValid,
    passwordMatch: isPasswordValid,
    adminEmailConfigured: Boolean(config.adminEmail),
    adminPasswordConfigured: Boolean(config.adminPassword),
    sessionSecretConfigured: Boolean(config.sessionSecret)
  }));

  const url = new URL(request.url);
  const isSecure = url.protocol === 'https:' || request.headers.get('x-forwarded-proto') === 'https';

  if (!isEmailValid || !isPasswordValid) {
    const failureInfo = await recordFailedLoginAttempt(
      request,
      env,
      config.sessionSecret,
      rateLimitResult.attempts
    );

    const remaining = failureInfo.remainingAttempts;
    const warningMessage =
      remaining > 0
        ? `Invalid admin credentials. (${remaining} attempt(s) remaining before temporary lockout)`
        : 'Too many failed login attempts. Account access is temporarily locked for 15 minutes.';

    const headers = new Headers();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'SAMEORIGIN');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (failureInfo.rateLimitCookie) {
      headers.set('Set-Cookie', failureInfo.rateLimitCookie);
    }

    return new Response(JSON.stringify({ error: warningMessage }), {
      status: 401,
      headers
    });
  }

  // 4. Create cryptographically signed session token
  const session = await createSessionToken(normalizedEmail, 'admin', config.sessionSecret);

  // 5. Clear rate limiter upon successful authentication
  const clearRlCookie = await clearRateLimit(request, env, config.sessionSecret);

  const headers = new Headers();
  headers.set('Content-Type', 'application/json; charset=utf-8');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Set-Cookie for signed HttpOnly session
  headers.append(
    'Set-Cookie',
    createSetCookieHeader(SESSION_COOKIE_NAME, session.token, {
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
      httpOnly: true,
      secure: isSecure,
      sameSite: 'Lax'
    })
  );

  if (clearRlCookie) {
    headers.append('Set-Cookie', clearRlCookie);
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Admin authentication successful',
      user: { email: normalizedEmail, role: 'admin' },
      csrfToken: session.csrfToken
    }),
    {
      status: 200,
      headers
    }
  );
};
