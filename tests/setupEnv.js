// setupEnv.js
// Global environment setup for Jest

// Default to 'test' if NODE_ENV not set
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// Demo mode fixtures path
process.env.FIXTURES_PATH = process.env.FIXTURES_PATH || 'tests/fixtures';

// Toggle strict schema validation in production
process.env.ENABLE_SCHEMA_VALIDATION = 
  process.env.NODE_ENV === 'production' ? 'true' : 'false';

// Toggle verbose logging in demo/test
process.env.ENABLE_VERBOSE_LOGGING = 
  process.env.NODE_ENV !== 'production' ? 'true' : 'false';

// Timestamp for test runs
process.env.TEST_RUN_TIMESTAMP = new Date().toISOString();

console.log(`[setupEnv] Environment: ${process.env.NODE_ENV}`);
console.log(`[setupEnv] Fixtures Path: ${process.env.FIXTURES_PATH}`);