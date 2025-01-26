/* eslint-disable @typescript-eslint/naming-convention */
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import pluginVitest from '@vitest/eslint-plugin';
import chakraUiPlugin from 'eslint-plugin-chakra-ui';
import checkFile from 'eslint-plugin-check-file';
import drizzle from 'eslint-plugin-drizzle';
import eslintImport from 'eslint-plugin-import';
import oxlint from 'eslint-plugin-oxlint';
import pluginPlaywright from 'eslint-plugin-playwright';
import prettier from 'eslint-plugin-prettier';
import writeGoodComments from 'eslint-plugin-write-good-comments';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const customConfig = {
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: {
      parser,
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
      project: './tsconfig.json',
    },
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    '@typescript-eslint': typescriptEslint,
    '@stylistic/js': stylisticJs,
    import: eslintImport,
    'check-file': checkFile,
    prettier: prettier,
    drizzle: drizzle,
    'write-good-comments': writeGoodComments,
    'chakra-ui': chakraUiPlugin,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
      },
    ],
    'check-file/folder-match-with-fex': [
      'error',
      {
        '*.test{s,}.{ts,tsx}': '**/__tests__/**',
        '*.stories.{tsx}': '**/__stories__/**',
        '*.mock{s,}.{ts,tsx}': '**/__mocks__/**',
      },
    ],
    'check-file/filename-naming-convention': [
      'error',
      {
        '**/*.{jsx,tsx,js,ts}': 'KEBAB_CASE',
      },
      {
        ignoreMiddleExtensions: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'builtin',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        custom: {
          regex: '^E[A-Z]',
          match: true,
        },
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      /*
       * {
       *   selector: 'interface',
       *   format: ['PascalCase'],
       *   custom: {
       *     regex: '^I[A-Z]',
       *     match: true,
       *   },
       * },
       */
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      /*
       * {
       *   selector: 'variable',
       *   types: ['boolean'],
       *   format: ['PascalCase'],
       *   prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'show'],
       *   filter: {
       *     regex: '^(success|error|loading|updated|deleted)$',
       *     match: false,
       *   },
       * },
       */
      {
        selector: 'variable',
        modifiers: ['destructured'],
        format: null,
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
    ],
    ...chakraUiPlugin.configs.recommended,
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-empty-object-type': [
      'error',
      {
        allowInterfaces: 'with-single-extends',
      },
    ],
    'import/no-unresolved': 'off',
    'drizzle/enforce-delete-with-where': 'off',
    'drizzle/enforce-update-with-where': 'error',
    '@stylistic/js/no-multiple-empty-lines': ['error', { max: 2 }],
    // '@stylistic/js/multiline-comment-style': ['error', 'starred-block'],
    'write-good-comments/write-good-comments': 'warn',
  },
};

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '.stylelintrc.cjs',
      'commitlint.config.cjs',
    ],
  },
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  customConfig,
  oxlint.configs['flat/recommended'],
];

export default eslintConfig;
