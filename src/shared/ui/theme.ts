import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineKeyframes,
  defineTokens,
} from '@chakra-ui/react';

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

export default customSystem;
