module.exports = {
  extends: '@natterstefan/eslint-config-ns/stylelint',
  ignoreFiles: [
    './coverage/**/*',
    './dist/**/*',
    './node_modules/**/*',
    './src/**/__snapshots__/**/*',
    './src/styles/fonts.scss',
    './src/styles/fonts/**/*',
  ],
}
