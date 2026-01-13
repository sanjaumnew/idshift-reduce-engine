const { isEmpty, normalizeString, generateId } = require('../src/utils');

describe('utils.js', () => {
  describe('isEmpty', () => {
    test('returns true for empty object', () => {
      expect(isEmpty({})).toBe(true);
    });

    test('returns false for non-empty object', () => {
      expect(isEmpty({ key: 'value' })).toBe(false);
    });
  });

  describe('normalizeString', () => {
    test('trims whitespace and lowercases string', () => {
      expect(normalizeString('  Hello World  ')).toBe('hello world');
    });

    test('handles empty string gracefully', () => {
      expect(normalizeString('')).toBe('');
    });
  });

  describe('generateId', () => {
    test('generates a non-empty string id', () => {
      const id = generateId();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });

    test('generates unique ids on multiple calls', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });
  });
});