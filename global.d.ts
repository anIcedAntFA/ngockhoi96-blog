import type en from './messages/en.json';

type Message = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Message {}
}
