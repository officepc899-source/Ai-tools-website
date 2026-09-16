import {
  Env,
  PagesFunction,
  SESSION_COOKIE_NAME,
  createClearCookieHeader
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
  const { request } = context;
  const url = new URL(request.url);
  const isSecure = url.protocol === 'https:' || request.headers.get('x-forwarded-proto') === 'https';

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
      success: true,
      message: 'Logged out successfully'
    }),
    {
      status: 200,
      headers
    }
  );
};
