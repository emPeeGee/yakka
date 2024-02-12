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

  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        project: './tsconfig.json',
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },

  rules: {
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/default': 'off',
    'import/no-named-as-default-member': 'error',
    'import/no-named-as-default': 'error',

    'max-params': ['error', 3], // Limit the number of parameters in a function to use object instead
    // 'max-lines-per-function': ['error', 70],
    // '@typescript-eslint/consistent-type-imports': 'error', // Ensure `import type` is used when it's necessary

    // First, include built-in imports like 'react' and 'react-native'.
    // Second, add third-party imports like 'reanimated'.
    // Third, include internal imports like '@/types', './utils'.
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', ['internal', 'sibling', 'parent', 'index']],
        pathGroups: [
          { pattern: 'react', group: 'builtin' },
          { pattern: 'react-native', group: 'builtin' },
          { pattern: '@/**', group: 'internal', position: 'before' },
        ],
        // It allows you to exclude certain types of imports from the grouping logic when using pathGroups.
        pathGroupsExcludedImportTypes: ['builtin'],
        // If distinctGroups is set to false, it means that no blank line will be enforced between different import groups. The imports from different groups will appear consecutively without a visual separation.
        distinctGroup: false, // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#distinctgroup-boolean
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
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        // 'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],

        'prefer-const': 'warn',
        'no-console': 'warn',
        'no-unused-vars': 'off',

        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/no-empty-function': ['warn'],
        '@typescript-eslint/no-explicit-any': ['warn'],
        '@typescript-eslint/no-use-before-define': [0, 'always'],

        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'react/prop-types': 'off',
        'react/no-array-index-key': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-key': ['error'],
        'react/no-unescaped-entities': 'error',
        'react/self-closing-comp': ['error', { component: true, html: true }],
        'react/jsx-curly-brace-presence': [
          'error',
          { props: 'never', children: 'never', propElementValues: 'always' },
        ],
      },
    },
  ],
};
// Add:
// https://github.com/intellicode/eslint-plugin-react-native
// react hooks
