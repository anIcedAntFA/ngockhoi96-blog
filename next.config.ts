import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // Recommended: this will reduce output
  // Docker image size by 80%+
  output: 'standalone',
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
  // Nginx will do gzip compression. We disable
  // compression here so we can prevent buffering
  // streaming responses
  compress: false,
  // Optional: override the default (1 year) `stale-while-revalidate`
  // header time for static pages
  // swrDelta: 3600 // seconds
};

const withNextIntl = createNextIntlPlugin(
  './src/shared/lib/i18n/i18n.request.ts',
);

export default withNextIntl(nextConfig);
