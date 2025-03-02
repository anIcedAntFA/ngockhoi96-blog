import localeConfig from '../../../../messages/config.json' assert { type: 'json' };

// Use the default: `always`
export const localePrefix = undefined;

// As set of available and enabled locales for the website
// This used for allowing us to redirect the user to any
// of the available locales that we have enabled on the website
const availableLocales = localeConfig.filter((locale) => locale.enabled);

// This gives an easy way of accessing all available locale codes
const availableLocaleCodes = availableLocales.map((locale) => locale.code);

// This provides the default locale information for the Next.js Application
// This marked by the unique `locale.default` property on the `en` locale
/** @type {import('./types').LocaleConfig} */
const defaultLocale = availableLocales.find((locale) => locale.default);

// Creates a Map of available locales for easy access
const availableLocalesMap = Object.fromEntries(
  localeConfig.map((locale) => [locale.code, locale]),
);

export {
  availableLocales,
  availableLocaleCodes,
  availableLocalesMap,
  defaultLocale,
};
