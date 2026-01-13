const Ajv = require('ajv');
const path = require('path');
const fs = require('fs');

describe('Report Schema Validation', () => {
  const ajv = new Ajv({ allErrors: true });

  const schemaPath = path.join(__dirname, '../schema/reportSchema.json');
  const samplePath = path.join(__dirname, '../schema/reportSample.json');

  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
  const sample = JSON.parse(fs.readFileSync(samplePath, 'utf-8'));

  test('validates all sample reports against reportSchema.json', () => {
    const validate = ajv.compile(schema);

    sample.results.forEach((report, index) => {
      const valid = validate(report);
      expect(valid).toBe(true);

      if (!valid) {
        console.error(`Validation errors for record ${index}:`, validate.errors);
      }
    });
  });

  test('validates meta block structure', () => {
    expect(sample.meta).toBeDefined();
    expect(typeof sample.meta.run).toBe('string');
    expect(typeof sample.meta.timestamp).toBe('string');
  });
});