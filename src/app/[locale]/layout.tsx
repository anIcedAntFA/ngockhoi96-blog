import { Box } from '@chakra-ui/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import type { PropsWithChildren } from 'react';

import { jetBrainMono, lora, openSans } from '@/shared/config/font.config';
import {
  availableLocaleCodes,
  availableLocalesMap,
  defaultLocale,
  routing,
} from '@/shared/lib/i18n';
import type { Todo } from '@/shared/lib/utility-types';
import Footer from '@/shared/ui/footer';
import NavigationBar from '@/shared/ui/navigation-bar';
import ScrollToTopButton from '@/shared/ui/scroll-to-top-button';

import LocaleProvider from '../_provider/locale-provider';
import ThemeProvider from '../_provider/theme-provider';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  const t = await getTranslations({ locale, namespace: 'home.metadata' });

  return {
    title: {
      default: "ngockhoi96's blog",
      template: "%s | ngockhoi96's blog",
    },
    description: t('description'),
    metadataBase: new URL('https://blog.ngockhoi96.dev'),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en-US',
        'vi-VN': '/vi-VN',
      },
    },
    generator: 'Next.js',
    applicationName: "ngockhoi96's blog",
    referrer: 'origin-when-cross-origin',
    keywords: [t('keywords')],
    authors: [{ name: 'ngockhoi96', url: 'https://blog.ngockhoi96.dev' }],
    creator: 'ngockhoi96',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: 'ngockhoi96',
      description: 'Developer, writer, and creator.',
      url: 'https://blog.ngockhoi96.dev',
      type: 'website',
      siteName: "ngockhoi96's blog",
      locale: 'vi_VN',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function getStarCount(user: string, repo: string): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/repos/${user}/${repo}`);
    const data = await res.json();

    if (!res.ok) return Promise.resolve(1);
    return data.stargazers_count;
  } catch (error) {
    console.error('Error fetching data from GitHub API:', error);
    return Promise.resolve(1);
  }
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

  const starCount = await getStarCount('anIcedAntFA', 'blog.ngockhoi96.dev');

  return (
    <html
      lang={hrefLang}
      dir={langDir}
      className={`${openSans.variable} ${lora.variable} ${jetBrainMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LocaleProvider>
          <ThemeProvider>
            <NavigationBar starCount={starCount} />
            <Box as='main' flex={1}>
              {children}
            </Box>
            <ScrollToTopButton />
            <Footer />
          </ThemeProvider>
        </LocaleProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}

export default LocaleLayout;
