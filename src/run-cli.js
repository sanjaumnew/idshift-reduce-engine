// src/run-cli.js

/**
 * CLI entry point for Reduce Engine
 * Parses arguments, loads input, runs Reduce, and writes output.
 */

const fs = require('fs');
const path = require('path');
const runReduce = require('./reduce');
const { logInfo, logError } = require('./utils');

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    input: null,
    output: null,
    mode: 'FREE',
    strict: false,
  };

  args.forEach(arg => {
    if (arg.startsWith('--input=')) {
      options.input = arg.split('=')[1];
    } else if (arg.startsWith('--output=')) {
      options.output = arg.split('=')[1];
    } else if (arg.startsWith('--mode=')) {
      options.mode = arg.split('=')[1].toUpperCase();
    } else if (arg === '--strict') {
      options.strict = true;
    }
  });

  return options;
}

function main() {
  const opts = parseArgs();

  if (!opts.input || !opts.output) {
    console.error('Usage: node run-cli.js --input=accounts.json --output=report.json [--mode=FREE|PREMIUM] [--strict]');
    process.exit(1);
  }

  try {
    const inputPath = path.resolve(opts.input);
    const outputPath = path.resolve(opts.output);

    const accounts = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
    const reports = runReduce(accounts, { mode: opts.mode, strict: opts.strict });

    fs.writeFileSync(outputPath, JSON.stringify(reports, null, 2));
    logInfo(`Report written to ${outputPath}`);
    process.exit(0);
  } catch (err) {
    logError(`CLI execution failed: ${err.message}`);
    process.exit(2);
  }
}

if (require.main === module) {
  main();
}