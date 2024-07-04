'use strict'

module.exports = {
  setupFilesAfterEnv: [
    '@openreachtech/renchan-test-tools/lib/environment/setupAfterEnv.js',
    '<rootDir>/node_modules/@openreachtech/jest-constructor-spy/config/setupAfterEnv.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
}
