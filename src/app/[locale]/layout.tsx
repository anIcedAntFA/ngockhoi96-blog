import { Box } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, setRequestLocale } from 'next-intl/server';
import type { PropsWithChildren } from 'react';

import { jetBrainMono, lora, openSans } from '@/shared/config/font.config';
import {
  availableLocaleCodes,
  availableLocalesMap,
  defaultLocale,
  routing,
} from '@/shared/lib/i18n';
import type { Todo } from '@/shared/lib/utility-types';
import ScrollToTopButton from '@/shared/ui/scroll-to-top-button';

import LocaleProvider from '../_provider/locale-provider';
import ThemeProvider from '../_provider/theme-provider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function LocaleLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Todo)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  if (!availableLocaleCodes.includes(locale)) {
    // throw new Error(`Unknown locale encountered: "${locale}".`);
    return null;
  }

  const { langDir, hrefLang } = availableLocalesMap[locale] || defaultLocale;

  return (
    <html lang={hrefLang} dir={langDir} suppressHydrationWarning>
      <body
        className={`${openSans.variable} ${lora.variable} ${jetBrainMono.variable}`}
      >
        <LocaleProvider>
          <ThemeProvider>
            <Box as='main'>{children}</Box>
            <ScrollToTopButton />
            <Box as='footer' h='800px' bg='blue.300'>
              <p>Footer</p>
            </Box>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}

export default LocaleLayout;
