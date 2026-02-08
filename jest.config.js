export default {
  setupFilesAfterEnv: [
    '@openreachtech/renchan-test-tools/lib/environment/setupAfterEnv.js',
    '<rootDir>/node_modules/@openreachtech/jest-constructor-spy/config/setupAfterEnv.js',
    '<rootDir>/tests/setup-after-env.js',
  ],
  moduleNameMapper: {
    // CJS のモジュールを import できるようにするためのマッピング
    // コメントアウトすると以下が失敗する
    // import { ConstructorSpy } from '@openreachtech/jest-constructor-spy'
    '^(@.*)$': '<rootDir>/node_modules/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
}
