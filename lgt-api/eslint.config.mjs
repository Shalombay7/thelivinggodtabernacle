// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'eslint.config.mjs',
      'src/generated/**',
      'src/prisma/AuthContext.tsx',
      'src/prisma/auth.controller.ts',
      'src/prisma/bible.controller.ts',
      'src/prisma/bible.service.ts',
      'src/prisma/events.controller.ts',
      'src/prisma/events.service.ts',
      'src/prisma/fellowship.service.ts',
      'src/prisma/jwt-auth.guard.ts',
      'src/prisma/jwt.strategy.ts',
      'src/prisma/page.tsx',
      'src/prisma/personalization.service.ts',
      'src/prisma/prayer-wall.controller.ts',
      'src/prisma/prayer-wall.module.ts',
      'src/prisma/prayer-wall.service.ts',
      'src/prisma/reading-plans.controller.ts',
      'src/prisma/reading-plans.service.ts',
      'src/prisma/sermons.controller.ts',
      'src/prisma/sermons.module.ts',
      'src/prisma/sermons.service.ts',
      'src/prisma/testimonies.controller.ts',
      'src/prisma/testimonies.module.ts',
      'src/prisma/testimonies.service.ts',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
);
