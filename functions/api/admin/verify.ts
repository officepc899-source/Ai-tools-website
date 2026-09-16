import {
  Env,
  PagesFunction,
  getAdminConfig,
  getSessionFromRequest,
  verifyCsrf,
  jsonResponse
} from './_auth';

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Allow': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token, Accept',
      'Access-Control-Allow-Credentials': 'true'
    }
  });
};

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const config = getAdminConfig(env);
  if (config.error || !config.sessionSecret) {
    return jsonResponse(
      { error: config.error || 'Server configuration error', authenticated: false },
      500
    );
  }

  const session = await getSessionFromRequest(request, config.sessionSecret);

  if (!session || session.role !== 'admin') {
    return jsonResponse(
      { error: 'Unauthorized: Admin authentication required', authenticated: false },
      401
    );
  }

  // Check CSRF for mutating HTTP methods
  const mutatingMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
  if (mutatingMethods.includes(request.method.toUpperCase())) {
    let body: any;
    try {
      body = await request.clone().json();
    } catch {
      body = undefined;
    }

    if (!verifyCsrf(request, session, body)) {
      return jsonResponse(
        { error: 'Forbidden: Invalid or missing CSRF token' },
        403
      );
    }
  }

  return jsonResponse({
    success: true,
    user: {
      email: session.email,
      role: session.role
    }
  });
};
