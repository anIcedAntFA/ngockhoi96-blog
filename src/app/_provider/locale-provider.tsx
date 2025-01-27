import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTimeZone } from 'next-intl/server';
import type { PropsWithChildren } from 'react';

async function LocaleProvider({ children }: PropsWithChildren) {
  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <NextIntlClientProvider messages={messages} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}

export default LocaleProvider;
