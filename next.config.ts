import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const buildENV = process.env.BUILD_ENV || 'production';
console.log(`BUILD_ENV: ${buildENV}, NODE_ENV: ${process.env.NODE_ENV}`);

const nextConfig: NextConfig = {
  // Optional: bring your own cache handler
  // cacheHandler: path.resolve('./cache-handler.mjs'),
  // cacheMaxMemorySize: 0, // Disable default in-memory caching
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  images: {
    // Optional: use a different optimization service
    // loader: 'custom',
    // loaderFile: './image-loader.ts',
    //
    // We're defaulting to optimizing images with
    // Sharp, which built-into `next start`
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin(
  './src/shared/lib/i18n/i18n.request.ts',
);

export default withNextIntl(nextConfig);
