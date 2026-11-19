import { timingSafeEqual } from 'crypto';
import type { RequestHandler } from 'express';

function matches(value: string, expected: string) {
  const valueBuffer = Buffer.from(value, 'utf8');
  const expectedBuffer = Buffer.from(expected, 'utf8');

  return (
    valueBuffer.length === expectedBuffer.length &&
    timingSafeEqual(valueBuffer, expectedBuffer)
  );
}

export const adminDashboardAuth: RequestHandler = (request, response, next) => {
  const username = process.env.ADMIN_DASHBOARD_USERNAME;
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;

  response.setHeader('Cache-Control', 'no-store');

  if (!username || !password) {
    response.status(503).type('text/plain').send('Admin dashboard is not configured.');
    return;
  }

  const authorization = request.header('authorization');
  const [scheme, token] = authorization?.split(/\s+/, 2) ?? [];

  if (scheme?.toLowerCase() === 'basic' && token) {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const separator = decoded.indexOf(':');

    if (
      separator >= 0 &&
      matches(decoded.slice(0, separator), username) &&
      matches(decoded.slice(separator + 1), password)
    ) {
      next();
      return;
    }
  }

  response.setHeader(
    'WWW-Authenticate',
    'Basic realm="The Living God Tabernacle Admin", charset="UTF-8"',
  );
  response.status(401).type('text/plain').send('Administrator access required.');
};
