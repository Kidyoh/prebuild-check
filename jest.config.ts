import type { Config } from 'jest';
import path from 'path';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  transformIgnorePatterns: [
    // Need to transform ESM modules
    'node_modules/(?!(.pnpm/)?(boxen|chalk|ora|strip-ansi|ansi-regex|string-width|eastasianwidth|emoji-regex|ansi-styles))'
  ],
  moduleNameMapper: {
    // Use mocks for ESM modules
    '^boxen$': path.resolve(__dirname, './tests/mocks/module-mock.js'),
    '^chalk$': path.resolve(__dirname, './tests/mocks/module-mock.js')
  },
  setupFiles: ['./tests/setup-fixtures.js']
};

export default config;