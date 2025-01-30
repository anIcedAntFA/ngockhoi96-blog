import type { KeyType } from '../utility-types';

export const pathnames = {
  '/': '/',
  '/en': '/en',
  '/vi': '/vi',
  '/about': {
    en: '/about',
    vi: '/ve-chung-toi',
  },
  '/articles': {
    en: '/articles',
    vi: '/bai-viet',
  },
  // '/articles/[slug]': {
  //   en: '/articles/[slug]',
  //   vi: '/bai-viet/[slug]',
  // },
  '/resources': {
    en: '/resources',
    vi: '/tai-nguyen',
  },
} as const;

export type Pathname = KeyType<typeof pathnames>;
