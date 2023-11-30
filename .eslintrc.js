module.exports = {
  root: true,
  extends: ['universe/native'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'import/no-cycle': 'warn',

    // TODO: import plugin
  },
};
