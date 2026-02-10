import {
  default as openreachtechConfig,
  // coreRuleOptionHash,
} from '@openreachtech/eslint-config'

export default [
  ...openreachtechConfig,

  {
    ignores: [
      './playground/**',
    ],
  },

  {
    files: [
      'tests/**/*.js',
    ],
    rules: {
      'max-classes-per-file': 'off',
    },
  },

  /*
   * If ignores is used without any other keys in the configuration object, then the patterns act as global ignores. Here’s an example:
   *
   * https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
   */
  {
    ignores: [
      'index.mjs',
    ],
  },

  {
    languageOptions: {
      sourceType: 'module',
    },
  },

  {
    rules: {
      'jest/no-deprecated-functions': 'off',
    },
  },

  {
    files: [
      'tests/**',
    ],
    rules: {
      'no-undefined': 'off',
    },
  },
]
