module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': ['error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      }],
    'max-len': [1, 200],
    'no-console': 'off',
  },
};
