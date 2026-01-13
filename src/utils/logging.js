// src/utils/logging.js

/**
 * Logging utility for Reduce Engine
 * Provides consistent INFO, WARN, and ERROR outputs
 * with timestamps for easier debugging and monitoring.
 */

/**
 * Format message with timestamp and level
 * @param {string} level - Log level (INFO, WARN, ERROR)
 * @param {string} message - Message to log
 * @returns {string}
 */
function formatMessage(level, message) {
  const timestamp = new Date().toISOString();
  return `[${level}] ${timestamp} - ${message}`;
}

/**
 * Info log
 * @param {string} message
 */
function logInfo(message) {
  console.log(formatMessage('INFO', message));
}

/**
 * Warning log
 * @param {string} message
 */
function logWarn(message) {
  console.warn(formatMessage('WARN', message));
}

/**
 * Error log
 * @param {string} message
 */
function logError(message) {
  console.error(formatMessage('ERROR', message));
}

module.exports = {
  logInfo,
  logWarn,
  logError,
};