const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

/**
 * Validate input account record
 * @param {Object} account
 * @param {boolean} strict
 */
function validateInput(account, strict = false) {
  if (!account || typeof account !== 'object') {
    throw new Error('Account must be an object');
  }

  if (strict) {
    // Load input schema dynamically
    const schema = require('../../schema/inputSchema.json');
    const validate = ajv.compile(schema);
    const valid = validate(account);

    if (!valid) {
      const errors = validate.errors.map(e => `${e.instancePath} ${e.message}`).join(', ');
      throw new Error(`Input validation failed: ${errors}`);
    }
  }
}

/**
 * Validate report against schema
 * @param {Object} report
 * @param {boolean} strict
 */
function validateReport(report, strict = false) {
  // Load schema dynamically
  const schema = require('../../schema/reportSchema.json');
  const validate = ajv.compile(schema);
  const valid = validate(report);

  if (!valid) {
    const errors = validate.errors.map(e => `${e.instancePath} ${e.message}`).join(', ');
    if (strict) throw new Error(`Report validation failed: ${errors}`);
    console.warn(`Report validation warnings: ${errors}`);
  }

  // Extra checks for richer fields
  if (strict) {
    if (!['human', 'synthetic', 'agentic_ai', 'unknown'].includes(report.classification)) {
      throw new Error(`Invalid classification: ${report.classification}`);
    }
    if (report.severity && !['low', 'medium', 'high'].includes(report.severity)) {
      throw new Error(`Invalid severity: ${report.severity}`);
    }
    if (report.signals && typeof report.signals !== 'object') {
      throw new Error('Signals must be an object');
    }
    if (report.remediation && !Array.isArray(report.remediation)) {
      throw new Error('Remediation must be an array');
    }
  }
}

/**
 * Logging helpers
 */
function logInfo(message) {
  console.log(`[INFO] ${message}`);
}

function logError(message) {
  console.error(`[ERROR] ${message}`);
}

module.exports = {
  validateInput,
  validateReport,
  logInfo,
  logError,
};