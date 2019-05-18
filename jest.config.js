module.exports = {
  verbose: true,
  setupFiles: [
    '<rootDir>/__tests__/setup/setupEnzyme.js'
  ],
  testRegex: '__tests__/.*\\.test\\.(t|j)sx?$',
  testPathIgnorePatterns: ['.tmp/', 'node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '.(css|jpg|png)$': '<rootDir>/__tests__/setup/emptyModule.js'
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/locales/*.js', '!**/node_modules/**'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: {
    DEV_MODE: false,
    'ts-jest': {
      diagnostics: {
        warnOnly: true
      }
    }
  }
}
