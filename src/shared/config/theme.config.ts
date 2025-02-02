import {
  createSystem,
  defaultConfig,
  defineAnimationStyles,
  defineConfig,
  defineGlobalStyles,
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

export const DESKTOP_HEADER_HEIGHT = 64;
export const TABLET_HEADER_HEIGHT = 56;
export const MOBILE_HEADER_HEIGHT = 48;

//* Custom `Chakra UI` configs
const globalCSS = defineGlobalStyles({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  'html, body': {
    fontFamily: 'body',
    fontWeight: 'normal',
    fontSize: 'md',
    lineHeight: 'moderate',
    letterSpacing: 'normal',
    bg: 'bg.default',
    color: 'fg.default',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
});

const customTokens = defineTokens({
  fonts: {
    body: { value: 'var(--font-open-sans-serif)' },
    heading: { value: 'var(--font-lora-serif)' },
    mono: { value: 'var(--font-jet-brain-mono)' },
  },
  colors: {
    snow: { value: '#fffafa' },
    ghostWhite: { value: '#f8f8ff' },
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
      default: {
        value: {
          base: '{colors.gray.800}',
          _dark: '{colors.snow}',
        },
      },
    },
    fgBase: {
      value: {
        base: '{colors.gray.500}',
        _dark: '{colors.gray.200}',
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
      default: {
        value: {
          base: '{colors.ghostWhite}',
          _dark: '{colors.gray.800}',
        },
      },
    },
  },
});

const customKeyframes = defineKeyframes({
  'shiny-glass': {
    '0%': {
      left: '-100%',
    },
    '25%': {
      left: '120%',
    },
    '100%': {
      left: '100%',
    },
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
      transform: 'scale(0.75)',
    },
    '50%': {
      transform: 'scale(1)',
    },
    '75%': {
      transform: 'scale(1.5)',
    },
    '100%': {
      transform: 'scale(1.25)',
    },
  },
  searchIcon: {
    '0%': {
      transform: 'scale(0.75)',
    },
    '50%': {
      transform: 'scale(1.25)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
});

const customAnimationStyles = defineAnimationStyles({
  'shiny-glass': {
    description: 'Shiny glass effect',
    value: {
      animationName: 'shiny-glass',
      animationDuration: '4s',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
    },
  },
});

const customConfig = defineConfig({
  cssVarsPrefix: 'nk96',
  globalCss: globalCSS,
  theme: {
    tokens: customTokens,
    semanticTokens: customSemanticTokens,
    keyframes: customKeyframes,
    animationStyles: customAnimationStyles,
  },
});

const customSystem = createSystem(defaultConfig, customConfig);
//* Must default exported for `ChakraProvider` to work
export default customSystem;
