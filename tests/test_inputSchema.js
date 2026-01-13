const Ajv = require('ajv');
const path = require('path');
const fs = require('fs');

describe('Input Schema Validation', () => {
  const ajv = new Ajv({ allErrors: true });

  const schemaPath = path.join(__dirname, '../schema/inputSchema.json');
  const samplePath = path.join(__dirname, './fixtures/sample_input.json');

  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
  const sample = JSON.parse(fs.readFileSync(samplePath, 'utf-8'));

  test('validates all sample inputs against inputSchema.json', () => {
    const validate = ajv.compile(schema);

    sample.records.forEach((record, index) => {
      const valid = validate(record);
      expect(valid).toBe(true);

      if (!valid) {
        console.error(`Validation errors for record ${index}:`, validate.errors);
      }
    });
  });

  test('warns if optional fields are missing', () => {
    sample.records.forEach((record, index) => {
      if (!record.name || !record.email) {
        console.warn(`Record ${index} is missing optional fields: name/email`);
      }
    });
  });
});