module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2018,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  settings: {
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json'],
      },
      node: {
        map: localPathMapper,
        extensions: ['.ts', '.js'],
      },
      alias: {
        map: localPathMapper,
        extensions: ['.ts', '.js'],
      },
    },
    'node': {
      allowModules: [],
      tryExtensions: ['.ts', '.js', '.json', '.node']
    }
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'plugin:node/recommended-module',
  ],
  root: true,
  globals: {
    process: true,
    __dirname: true,
  },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'node/no-missing-import': 0,
    'no-underscore-dangle': 0,
    'no-useless-constructor': 0,
    'no-unused-vars': 0,
    'no-empty-function': 0,
  },
};
