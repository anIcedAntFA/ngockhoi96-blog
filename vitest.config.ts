/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.{ts,tsx}'],
    exclude: [
      ...configDefaults.exclude,
      '**/coverage/**',
      '**/dist/**',
      '**/e2e/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    reporters: ['junit', 'default'],
    outputFile: {
      junit: './vitest-report.xml',
    },
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['json-summary', 'text'],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
  },
});

// confirmar se o arquivo vite.d.ts tem as seguintes importações de tipos

/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />
