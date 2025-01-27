import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  compiler: {
    reactRemoveProperties: { properties: ['^data-custom$'] },
  },
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
};

const withNextIntl = createNextIntlPlugin(
  './src/shared/lib/i18n/i18n.request.ts',
);

export default withNextIntl(nextConfig);
