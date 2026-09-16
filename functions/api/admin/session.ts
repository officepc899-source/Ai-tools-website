import {
  Env,
  PagesFunction,
  getAdminConfig,
  getSessionFromRequest,
  SESSION_COOKIE_NAME,
  createClearCookieHeader,
  jsonResponse
} from './_auth';

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Allow': 'GET, OPTIONS',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token, Accept',
      'Access-Control-Allow-Credentials': 'true'
    }
  });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const config = getAdminConfig(env);
  if (config.error || !config.sessionSecret) {
    return jsonResponse(
      { authenticated: false, error: config.error || 'Server configuration error' },
      500
    );
  }

  const session = await getSessionFromRequest(request, config.sessionSecret);
  const url = new URL(request.url);
  const isSecure = url.protocol === 'https:' || request.headers.get('x-forwarded-proto') === 'https';

  if (session && session.role === 'admin') {
    return jsonResponse({
      authenticated: true,
      user: {
        email: session.email,
        role: session.role
      },
      csrfToken: session.csrfToken
    });
  }

  // Clear any expired or tampered session cookie
  const headers = new Headers();
  headers.set('Content-Type', 'application/json; charset=utf-8');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set(
    'Set-Cookie',
    createClearCookieHeader(SESSION_COOKIE_NAME, {
      path: '/',
      secure: isSecure,
      sameSite: 'Lax'
    })
  );

  return new Response(
    JSON.stringify({
      authenticated: false,
      message: 'No valid admin session'
    }),
    {
      status: 401,
      headers
    }
  );
};
