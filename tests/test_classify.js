const classify = require('../src/classify');

describe('classify', () => {
  test('classifies a valid human account correctly', () => {
    const input = { 
      name: 'John Doe', 
      email: 'john.doe@example.com', 
      activityScore: 75 
    };
    const result = classify(input);
    expect(result.classification).toBe('human');
    expect(result.riskFlags).toEqual([]);
    expect(result.severity).toBe('low');
  });

  test('flags non-human (bot) input correctly', () => {
    const input = { 
      name: 'Bot Account', 
      email: 'bot@system.com', 
      activityScore: 10, 
      traits: ['synthetic'] 
    };
    const result = classify(input);
    expect(result.classification).toBe('synthetic');
    expect(result.riskFlags).toContain('synthetic_identity');
    expect(result.severity).toBe('high');
  });

  test('classifies agentic AI identity correctly', () => {
    const input = { 
      name: 'AI Entity', 
      email: 'agent@system.ai', 
      activityScore: 90, 
      traits: ['agentic'] 
    };
    const result = classify(input);
    expect(result.classification).toBe('agentic_ai');
    expect(result.riskFlags).toContain('non_human');
    expect(result.riskFlags).toContain('agentic_identity');
    expect(result.severity).toBe('high');
    expect(result.remediation).toContain('Assess autonomy and decision-making patterns');
  });

  test('handles missing type gracefully (unknown)', () => {
    const input = { id: '789' };
    const result = classify(input);
    expect(result.classification).toBe('unknown');
    expect(result.riskFlags).toContain('low_confidence');
    expect(result.severity).toBe('medium');
  });

  test('throws error on malformed input', () => {
    const input = null;
    expect(() => classify(input)).toThrow('Invalid input');
  });
});