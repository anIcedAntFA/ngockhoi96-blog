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
    fg: {
      value: {
        base: '{colors.gray.800}',
        _dark: '{colors.snow}',
      },
    },
    bg: {
      default: {
        value: {
          base: '{colors.ghostWhite}',
          _dark: '{colors.gray.800}',
        },
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
      fontWeight: 'normal',
      fontSize: 'md',
      fontFamily: 'body',
      bg: 'bg.default',
      color: 'fg',
    },
  },
  theme: {
    semanticTokens: customSemanticTokens,
    tokens: customTokens,
    keyframes: customKeyframes,
  },
});

const customSystem = createSystem(defaultConfig, customConfig);
//* Must default exported for `ChakraProvider` to work
export default customSystem;
