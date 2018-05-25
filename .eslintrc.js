module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['jest', 'prettier'], // alternative: https://github.com/prettier/prettier-eslint
  env: {
    browser: true,
    es6: true,
    node: false,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      defaultParams: true,
      spread: true,
    },
  },
  globals: {
    jest: true,
    afterAll: true,
    afterEach: true,
    beforeAll: true,
    beforeEach: true,
    context: true,
    describe: true,
    expect: true,
    global: true,
    it: true,
    module: true,
    window: true,
  },
  rules: {
    'import/prefer-default-export': 0,
    'no-case-declarations': 0,
    'no-plusplus': 0,
    'prettier/prettier': [
      'error',
      {
        // keep this in sync with .prettierrc
        bracketSpacing: true,
        printWidth: 100,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'react/jsx-curly-brace-presence': 'never', // use '' when passing a strint as a property
    'react/jsx-filename-extension': 0, // we do not use *.jsx files
    'react/sort-comp': 2,
  },
  overrides: [
    {
      files: ['src/**/*.test.js'],
      rules: {
        'no-console': 0,
        'global-require': 0,
      },
    },
  ],
}
