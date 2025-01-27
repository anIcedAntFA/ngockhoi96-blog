import createMiddleware from 'next-intl/middleware';

import { routing } from './shared/lib/i18n';

export default createMiddleware(routing);

export const config = {
  //* Match internationalized pathnames
  matcher: [
    //* Enable a redirect to a matching locale at the root
    '/',
    //* Set a cookie to remember the previous locale for
    //* all requests that have a locale prefix
    '/(en|vi)/:path*',
    //* Enable redirects that add missing locales
    //* (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
