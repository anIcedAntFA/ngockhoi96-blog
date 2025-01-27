import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineKeyframes,
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
  colors: {
    ngockhoi96: {
      value: 'orange',
    },
  },
});

const customConfig = defineConfig({
  cssVarsPrefix: 'nk96',
  globalCss: {
    'html, body': {
      margin: 0,
      padding: 0,
    },
  },
  theme: {
    tokens: customTokens,
    keyframes: customKeyframes,
  },
});

const customSystem = createSystem(defaultConfig, customConfig);
//* Must default exported for `ChakraProvider` to work
export default customSystem;
