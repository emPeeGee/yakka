// TODO:  airbnb, and others
// https://github.com/expo/expo/blob/master/packages/eslint-config-universe/shared/react.js
module.exports = {
  root: true,
  env: { node: true, es6: true },
  extends: [
    'eslint:recommended',
    'prettier',

    // import
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['node_modules/*'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-named-as-default': 'error',

    // First, include built-in imports like 'react' and 'react-native'.
    // Second, add third-party imports like 'reanimated'.
    // Third, include internal imports like 'utils'.
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index'],
        pathGroups: [
          { pattern: 'react', group: 'builtin' },
          { pattern: 'react-native', group: 'builtin' },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
      settings: {
        react: { version: 'detect' },
        'import/resolver': {
          typescript: true,
        },
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        // 'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'prefer-const': 'warn',

        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',

        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],

        '@typescript-eslint/no-empty-function': ['warn'],
        '@typescript-eslint/no-explicit-any': ['warn'],
        'no-console': 'warn',

        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      },
    },
  ],
};
