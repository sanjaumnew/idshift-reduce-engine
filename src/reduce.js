const fs = require('fs');
const path = require('path');
const classify = require('./classify');
const { validateInput, validateReport, logInfo, logError } = require('./utils/validation');

/**
 * Reduce Engine Orchestrator
 * @param {Array} accounts - Array of account objects
 * @param {Object} options - { mode: 'FREE' | 'PREMIUM', strict: boolean }
 * @returns {Array} reports
 */
function runReduce(accounts, options = { mode: 'FREE', strict: false }) {
  logInfo(`Starting Reduce Engine in ${options.mode} mode...`);

  if (!Array.isArray(accounts)) {
    throw new Error('Input must be an array of accounts');
  }

  const reports = accounts.map((account, index) => {
    try {
      validateInput(account, options.strict);

      // Classification result from classify.js
      const result = classify(account);

      // Base report
      const report = {
        accountId: account.accountId || account.id || `record-${index}`,
        classification: result.classification,
        riskFlags: result.riskFlags,
        timestamp: new Date().toISOString(),
      };

      // Premium mode includes full details
      if (options.mode === 'PREMIUM') {
        report.severity = result.severity;
        report.signals = result.signals;
        report.remediation = result.remediation || [];
      }

      validateReport(report, options.strict);
      return report;
    } catch (err) {
      logError(`Error processing account ${index}: ${err.message}`);
      return {
        accountId: account.accountId || account.id || `record-${index}`,
        classification: 'unknown',
        riskFlags: ['error'],
        severity: 'high',
        timestamp: new Date().toISOString(),
        remediation: ['Manual review required'],
      };
    }
  });

  logInfo(`Processed ${reports.length} accounts.`);
  return reports;
}

/**
 * CLI runner
 */
function runCLI() {
  const args = process.argv.slice(2);
  const inputArg = args.find(arg => arg.startsWith('--input='));
  const outputArg = args.find(arg => arg.startsWith('--output='));
  const modeArg = args.find(arg => arg.startsWith('--mode='));
  const strictArg = args.includes('--strict');

  if (!inputArg || !outputArg) {
    console.error('Usage: npm run reduce -- --input=accounts.json --output=report.json [--mode=FREE|PREMIUM] [--strict]');
    process.exit(1);
  }

  const inputPath = inputArg.split('=')[1];
  const outputPath = outputArg.split('=')[1];
  const mode = modeArg ? modeArg.split('=')[1] : 'FREE';

  const accounts = JSON.parse(fs.readFileSync(path.resolve(inputPath), 'utf-8'));
  const reports = runReduce(accounts, { mode, strict: strictArg });

  fs.writeFileSync(path.resolve(outputPath), JSON.stringify(reports, null, 2));
  logInfo(`Report written to ${outputPath}`);
}

if (require.main === module) {
  runCLI();
}

module.exports = { runReduce };