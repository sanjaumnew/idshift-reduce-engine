const { reduceData } = require('../src/reduce');

describe('reduceData', () => {
  test('reduces numeric value correctly', () => {
    const input = { value: 10 };
    const result = reduceData(input);
    expect(result.reduced).toBe(5); // Adjust based on actual logic
  });

  test('handles empty input gracefully', () => {
    const input = {};
    const result = reduceData(input);
    expect(result).toEqual({ reduced: null }); // Or your fallback structure
  });

  test('throws error on non-numeric input', () => {
    const input = { value: 'abc' };
    expect(() => reduceData(input)).toThrow('Invalid input'); // Customize error message
  });

  test('preserves metadata if present', () => {
    const input = { value: 20, meta: { source: 'demo' } };
    const result = reduceData(input);
    expect(result.meta.source).toBe('demo');
  });
});