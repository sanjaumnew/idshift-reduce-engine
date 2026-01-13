/**
 * classify.js
 * Classify identity type and risk flags
 * Supports human, synthetic, agentic AI, and unknown identities
 * @param {Object} account - Input account record
 * @returns {Object} result - classification, riskFlags, severity, signals, remediation
 */
function classify(account) {
  if (!account || typeof account !== 'object') {
    throw new Error('Invalid input');
  }

  const signals = {
    hasHumanName: /^[A-Z][a-z]+ [A-Z][a-z]+$/.test(account.name || ''),
    emailValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account.email || ''),
    activityScore: typeof account.activityScore === 'number' ? account.activityScore : 0,
    aiTraits: account.traits?.includes('agentic') || account.agentic === true || false,
    syntheticHints: account.traits?.includes('synthetic') || false,
  };

  let classification = 'unknown';
  const riskFlags = [];

  if (signals.aiTraits) {
    classification = 'agentic_ai';
    riskFlags.push('non_human', 'agentic_identity');
  } else if (signals.syntheticHints) {
    classification = 'synthetic';
    riskFlags.push('synthetic_identity');
  } else if (signals.hasHumanName && signals.emailValid && signals.activityScore > 50) {
    classification = 'human';
  } else {
    classification = 'unknown';
    riskFlags.push('low_confidence');
  }

  // Severity logic
  let severity = 'low';
  if (riskFlags.includes('non_human') || riskFlags.includes('synthetic_identity')) {
    severity = 'high';
  } else if (riskFlags.includes('low_confidence')) {
    severity = 'medium';
  }

  // Remediation suggestions
  const remediation = [];
  if (classification !== 'human') {
    remediation.push('Review account manually');
    remediation.push('Check for behavioral anomalies');
    if (classification === 'agentic_ai') {
      remediation.push('Assess autonomy and decision-making patterns');
    }
    if (classification === 'synthetic') {
      remediation.push('Verify identity documents and cross-check metadata');
    }
  }

  return {
    classification,
    riskFlags,
    severity,
    signals,
    remediation,
  };
}

module.exports = classify;