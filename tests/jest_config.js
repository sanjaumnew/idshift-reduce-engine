module.exports = {
  // Root directory for tests
  roots: ['<rootDir>/tests'],

  // Match test files
  testMatch: [
    '**/tests/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],

  // Use Node environment
  testEnvironment: 'node',

  // Collect coverage from src modules
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/index.js' // exclude entry points if needed
  ],

  // Coverage report formats
  coverageReporters: ['text', 'lcov', 'json'],

  // Fixture handling (JSON modules)
  moduleFileExtensions: ['js', 'json'],

  // Clear mocks between tests
  clearMocks: true,

  // Verbose output for contributors
  verbose: true,

  // Setup files (optional: global mocks or env)
  setupFiles: ['<rootDir>/tests/setupEnv.js'],

  // CI/CD friendly
  bail: true, // stop on first failure in production
};