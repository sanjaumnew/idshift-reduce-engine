const Ajv = require('ajv');
const path = require('path');
const fs = require('fs');
const runReduce = require('../src/reduce');

describe('Integration Pipeline', () => {
  const ajv = new Ajv({ allErrors: true });

  const inputSchema = require('../schema/inputSchema.json');
  const reportSchema = require('../schema/reportSchema.json');

  const sampleInputPath = path.join(__dirname, './fixtures/sample_input.json');
  const expectedOutputPath = path.join(__dirname, './fixtures/expected_output.json');

  const sampleInput = JSON.parse(fs.readFileSync(sampleInputPath, 'utf-8'));
  const expectedOutput = JSON.parse(fs.readFileSync(expectedOutputPath, 'utf-8'));

  test('pipeline produces expected output', () => {
    const reports = runReduce(sampleInput.records, { mode: 'PREMIUM', strict: true });
    expect(reports).toEqual(expectedOutput.results);
  });

  test('all inputs validate against inputSchema.json', () => {
    const validateInput = ajv.compile(inputSchema);

    sampleInput.records.forEach((record, index) => {
      const valid = validateInput(record);
      expect(valid).toBe(true);

      if (!valid) {
        console.error(`Input validation errors for record ${index}:`, validateInput.errors);
      }
    });
  });

  test('all outputs validate against reportSchema.json', () => {
    const validateReport = ajv.compile(reportSchema);

    expectedOutput.results.forEach((report, index) => {
      const valid = validateReport(report);
      expect(valid).toBe(true);

      if (!valid) {
        console.error(`Report validation errors for record ${index}:`, validateReport.errors);
      }
    });
  });
});