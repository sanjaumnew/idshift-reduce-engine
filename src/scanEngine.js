// src/scanEngine.js

/**
 * SCAN Engine - Detection Primitives
 * This module is separate from Reduce Engine.
 * It exposes reusable detection functions that Reduce can import if needed.
 *
 * Keep SCAN independent: Reduce should only consume stable, documented functions.
 */

/**
 * Detect agentic AI traits in an account record
 * @param {Object} account
 * @returns {boolean}
 */
function detectAgenticAI(account) {
  return account.traits?.includes('agentic') || false;
}

/**
 * Detect synthetic identity hints
 * @param {Object} account
 * @returns {boolean}
 */
function detectSyntheticIdentity(account) {
  return account.traits?.includes('synthetic') || false;
}

/**
 * Compute activity score severity
 * @param {number} score
 * @returns {string} severity - low | medium | high
 */
function computeSeverity(score) {
  if (score >= 80) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

/**
 * Exported API
 */
module.exports = {
  detectAgenticAI,
  detectSyntheticIdentity,
  computeSeverity,
};