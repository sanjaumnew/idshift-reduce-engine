// src/utils/index.js

const {
  validateInput,
  validateReport,
  logInfo,
  logError,
} = require('./validation');

/**
 * Central export for all utility functions.
 * Import from here instead of individual files to keep code clean.
 *
 * Example:
 *   const { validateInput, logInfo } = require('./utils');
 */

module.exports = {
  validateInput,
  validateReport,
  logInfo,
  logError,
};