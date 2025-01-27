import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { pathnames } from './i18n.config';
import { availableLocaleCodes, localePrefix } from './i18n.locales';

export const routing = defineRouting({
  //* A list of all locales supported
  locales: availableLocaleCodes,
  //* Used when no locale matches
  defaultLocale: 'en',
  pathnames,
  localePrefix,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
