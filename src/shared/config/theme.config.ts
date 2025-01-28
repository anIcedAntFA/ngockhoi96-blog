import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineKeyframes,
  defineSemanticTokens,
  defineTokens,
} from '@chakra-ui/react';
import type { Attribute } from 'next-themes';

import type { ValueType } from '../lib/utility-types';

//* Custom `next-themes` configs
export const themes = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;
export type Theme = ValueType<typeof themes>;

export const THEME_STORAGE_KEY = 'theme-mode';
export const THEME_ATTRIBUTES: Attribute[] = ['class', 'data-theme'];

//* Custom `Chakra UI` configs
const customKeyframes = defineKeyframes({
  shakeX: {
    '0%, 100%': { transform: 'translateX(-100%)' },
    '50%': { transform: 'translateX(100%)' },
  },
  goToTopIcon: {
    '0%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '30%': {
      opacity: 0.5,
      transform: ' translateY(-100%)',
    },
    '40% ': {
      opacity: 0,
      transform: 'translateY(-100%)',
    },
    '50% ': {
      opacity: 0,
      transform: 'translateY(100%)',
    },
    '80%': {
      opacity: 0.5,
      transform: 'translateY(-50%)',
    },
  },
  githubStarIcon: {
    '0%': {
      transform: 'scale(1)',
    },
    '25%': {
      transform: 'scale(0.8)',
    },
    '50%': {
      transform: 'scale(1)',
    },
    '75%': {
      transform: 'scale(1.6)',
    },
    '100%': {
      transform: 'scale(1.2)',
    },
  },
});

const customTokens = defineTokens({
  fonts: {
    body: {
      value: 'Open Sans, sans-serif',
    },
    heading: {
      value: 'Lora, serif',
    },
    mono: {
      value: 'JetBrains Mono, monospace',
    },
  },
  colors: {
    snow: {
      value: '#fffafa',
    },
    ghostWhite: {
      value: '#f8f8ff',
    },
  },
});

const customSemanticTokens = defineSemanticTokens({
  colors: {
    primary: {
      value: {
        base: '{colors.green.600}',
        _dark: '{colors.green.300}',
      },
    },
    fg: {
      value: {
        base: '{colors.gray.800}',
        _dark: '{colors.snow}',
      },
    },
    fgSecondary: {
      value: {
        base: '{colors.gray.600}',
        _dark: '{colors.gray.400}',
      },
    },
    fgTertiary: {
      value: {
        base: '{colors.snow}',
        _dark: '{colors.gray.800}',
      },
    },
    bg: {
      value: {
        base: '{colors.ghostWhite}',
        _dark: '{colors.gray.800}',
      },
    },
  },
});

const customConfig = defineConfig({
  cssVarsPrefix: 'nk96',
  globalCss: {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    'html, body': {
      fontFamily: 'body',
      fontWeight: 'normal',
      fontSize: 'md',
      bg: 'bg',
      color: 'fg',
    },
  },
  theme: {
    tokens: customTokens,
    semanticTokens: customSemanticTokens,
    keyframes: customKeyframes,
  },
});

const customSystem = createSystem(defaultConfig, customConfig);
//* Must default exported for `ChakraProvider` to work
export default customSystem;
