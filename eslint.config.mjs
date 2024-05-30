/* eslint-disable @typescript-eslint/no-unused-vars */
import { fixupConfigRules } from '@eslint/compat';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'; // Adicione a extensão .js

export default {
  overrides: [
    { files: ['src/**/*.js'], parserOptions: { sourceType: 'commonjs' } },
    {
      files: ['*.js', '*.tsx'],
      rules: {
        // Define your JavaScript specific rules here
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
      ],
      plugins: ['@typescript-eslint', 'react', 'react-hooks'],
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn'
        
      }
    }
  ],
  globals: {
    // Define your global variables here, e.g., 'AudioWorkletGlobalScope': false
  },
  plugins: ['react'],
  extends: ['plugin:react-hooks/recommended'],
  settings: {
    react: {
      version: 'detect'
    }
  }
};
