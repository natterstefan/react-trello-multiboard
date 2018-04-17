/* global module */
module.exports = {
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/prop-types.js',
    '!src/__tests__/**/*.js',
    '!src/__mocks__/**/*.js',
  ],
  testPathIgnorePatterns: ['<rootDir>/(dist|node_modules)/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['./setup-jest.js'],
}
