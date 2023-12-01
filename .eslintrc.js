// TODO: Add import, airbnb, and others
// https://github.com/expo/expo/blob/master/packages/eslint-config-universe/shared/react.js
module.exports = {
  root: true,
  env: { node: true, es6: true },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['react', '@typescript-eslint', 'prettier'],

  ignorePatterns: ['node_modules/*'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      settings: {
        react: { version: 'detect' },
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
        '@typescript-eslint/no-unused-vars': 'warn',

        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],

        '@typescript-eslint/no-empty-function': ['warn'],
        '@typescript-eslint/no-explicit-any': ['warn'],

        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      },
    },
  ],
};
