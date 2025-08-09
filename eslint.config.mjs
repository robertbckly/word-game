// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import * as reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended || {},
  reactPlugin.configs.flat['jsx-runtime'] || {},
  reactHooks.configs['recommended-latest'],
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    rules: {
      'import/no-cycle': ['error', { maxDepth: Infinity }],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      eqeqeq: 'error',
      'no-useless-rename': 'error',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/react-compiler': 'error',
    },
  },
);
