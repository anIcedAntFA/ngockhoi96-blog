'use client';

import { ChakraProvider } from '@chakra-ui/react';
import type { ThemeProviderProps } from 'next-themes';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import customSystem, {
  THEME_ATTRIBUTES,
  THEME_STORAGE_KEY,
  themes,
} from '@/shared/config/theme.config';

function ThemeProvider(props: ThemeProviderProps) {
  return (
    <ChakraProvider value={customSystem}>
      <NextThemeProvider
        themes={[themes.LIGHT, themes.DARK]}
        attribute={THEME_ATTRIBUTES}
        defaultTheme={themes.SYSTEM}
        storageKey={THEME_STORAGE_KEY}
        enableSystem
        disableTransitionOnChange
        {...props}
      />
    </ChakraProvider>
  );
}

export default ThemeProvider;
