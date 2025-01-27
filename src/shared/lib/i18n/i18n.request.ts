import { getRequestConfig } from 'next-intl/server';

import type { Todo } from '../utility-types';

import { routing } from './i18n.routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale used
  if (!locale || !routing.locales.includes(locale as Todo)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../../../messages/${locale}.json`)).default,
  };
});
