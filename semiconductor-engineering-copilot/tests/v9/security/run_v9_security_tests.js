/**
 * Semiconductor Engineering Copilot - V9 Security & Supply-Chain Trust Test Suite
 * Validates Merkle tree artifact provenance, zero-trust secrets scrubbing, EDA jail, DPA leakage, ASIL-D, and Sentinel lock guards.
 */

'use strict';

const assert = require('assert');
const v9 = require('../../../extensions/v9/index.js');

let passCount = 0;
let failCount = 0;
const failures = [];

function secTest(name, fn) {
  try {
    fn();
    passCount++;
  } catch (err) {
    failCount++;
    failures.push({ name, error: err.message });
    console.error(`[FAIL] ${name}: ${err.message}`);
  }
}

console.log('--- Starting Semiconductor Copilot V9 Security & Trust Test Suite ---');

// 1. Merkle Tree Artifact Integrity
secTest('SEC-01: Cryptographic Merkle Root Verification & Anti-Tamper', () => {
  const bufA = Buffer.from('gds_stream_v9_layer_poly');
  const bufB = Buffer.from('gds_stream_v9_layer_metal1');
  const tree1 = v9.v9_141_cryptographicMerkleTreeArtifactIntegrityVerifier([bufA, bufB]);
  const tree2 = v9.v9_141_cryptographicMerkleTreeArtifactIntegrityVerifier([bufA, bufB]);
  const tampered = v9.v9_141_cryptographicMerkleTreeArtifactIntegrityVerifier([bufA, Buffer.from('tampered_metal1')]);

  assert.strictEqual(tree1.merkleRoot, tree2.merkleRoot);
  assert.notStrictEqual(tree1.merkleRoot, tampered.merkleRoot);
});

// 2. Zero-Trust Hardware Secrets Scrubbing
secTest('SEC-02: Zero-Trust Hardware Secrets & OTP Key Scrubber', () => {
  const secretLog = 'OTP Key 0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef with ROT_KEY_PRIMARY=secretseed42';
  const scrubbed = v9.v9_142_zeroTrustHardwareSecretsPiiScrubber(secretLog);

  assert(!scrubbed.scrubbedPayload.includes('0x0123456789abcdef'));
  assert(!scrubbed.scrubbedPayload.includes('secretseed42'));
  assert(scrubbed.scrubbedPayload.includes('[REDACTED_SEC_KEY]'));
  assert(scrubbed.scrubbedPayload.includes('[REDACTED_ROT_KEY]'));
});

// 3. Sandboxed EDA Execution Command Jail
secTest('SEC-03: Sandboxed EDA Execution Command Jail & Shell Injection Shield', () => {
  const safe = v9.v9_143_sandboxedEdaExecutionCommandJailEnforcer('yosys -v synth.tcl', ['yosys', 'verilator']);
  assert.strictEqual(safe.executionAllowed, true);

  const malicious = v9.v9_143_sandboxedEdaExecutionCommandJailEnforcer('yosys -v; rm -rf /', ['yosys']);
  assert.strictEqual(malicious.executionAllowed, false);
  assert.strictEqual(malicious.status, 'COMMAND_BLOCKED_SECURITY_VIOLATION');
});

// 4. Side-Channel Power Leakage Vulnerability Assessor
secTest('SEC-04: DPA Side-Channel Power Leakage Detection', () => {
  const safe = v9.v9_144_dpaSideChannelPowerTraceVulnerabilityScanner(0.8);
  const leaky = v9.v9_144_dpaSideChannelPowerTraceVulnerabilityScanner(2.8);

  assert.strictEqual(safe.vulnerableToDpa, false);
  assert.strictEqual(leaky.vulnerableToDpa, true);
});

// 5. ISO 26262 ASIL-D Automotive Safety Metric Signoff
secTest('SEC-05: ISO 26262 ASIL-D Diagnostic Coverage Safety Gate', () => {
  const compliant = v9.v9_145_iso26262AsilDDiagnosticCoverageMetricSignoff(99.4, 91.2, 5.1);
  const violation = v9.v9_145_iso26262AsilDDiagnosticCoverageMetricSignoff(97.5, 88.0, 15.0);

  assert.strictEqual(compliant.asilDCompliant, true);
  assert.strictEqual(violation.asilDCompliant, false);
});

// 6. Absolute Non-Destructive File Upgrade Sentinel
secTest('SEC-06: Non-Destructive File Upgrade Sentinel Guard', () => {
  const protectedTargets = [
    'semiconductor-engineering-copilot/SKILL.md',
    'semiconductor-engineering-copilot/README.md',
    'semiconductor-engineering-copilot/modules/v5/index.js',
    'semiconductor-engineering-copilot/extensions/v6/index.js',
    'semiconductor-engineering-copilot/extensions/v7/index.js',
    'semiconductor-engineering-copilot/extensions/v8/index.js'
  ];

  protectedTargets.forEach(tgt => {
    const writeCheck = v9.v9_146_nonDestructiveFileUpgradeSentinelGuard(tgt, 'WRITE');
    const deleteCheck = v9.v9_146_nonDestructiveFileUpgradeSentinelGuard(tgt, 'DELETE');
    const readCheck = v9.v9_146_nonDestructiveFileUpgradeSentinelGuard(tgt, 'READ');

    assert.strictEqual(writeCheck.actionPermitted, false);
    assert.strictEqual(deleteCheck.actionPermitted, false);
    assert.strictEqual(readCheck.actionPermitted, true);
  });
});

// 7. ITAR / EAR99 Dual-Use Export Control Scanner
secTest('SEC-07: ITAR / EAR99 Dual-Use Export Control Screening', () => {
  const civ = v9.v9_147_exportControlDualUseMunitionsScanner('Standard consumer microcontroller');
  const itar = v9.v9_147_exportControlDualUseMunitionsScanner('ITAR military radar dual-use munitions');

  assert.strictEqual(civ.classification, 'EAR99_CIVILIAN');
  assert.strictEqual(itar.classification, 'ITAR_RESTRICTED');
  assert.strictEqual(itar.isItarRestricted, true);
});

// 8. Role-Based Engineering Access Control
secTest('SEC-08: Cryptographic Token Issuance & Role Verification', () => {
  const token = v9.v9_148_rbacRoleBasedEngineeringAccessTokenIssuer('architect_01', 'LEAD_DESIGNER');
  assert(token.sessionToken.length === 64);
  assert.strictEqual(token.status, 'RBAC_TOKEN_ISSUED');
});

// 9. Differential Privacy Noise Injection
secTest('SEC-09: Differential Privacy Noise Generation for Foundry Telemetry', () => {
  const dp1 = v9.v9_149_differentialPrivacyYieldTelemetryNoiseInjector(94.5, 0.5);
  const dp2 = v9.v9_149_differentialPrivacyYieldTelemetryNoiseInjector(94.5, 0.5);

  assert.notStrictEqual(dp1.noisyYieldPct, 94.5);
  assert.notStrictEqual(dp1.noisyYieldPct, dp2.noisyYieldPct);
  assert.strictEqual(dp1.status, 'DIFFERENTIAL_PRIVACY_INJECTED');
});

console.log(`\n--- V9 Security Test Results: ${passCount} Passed, ${failCount} Failed ---`);
if (failCount > 0) {
  process.exit(1);
} else {
  console.log('ALL SECURITY, IMMUTABILITY & COMPLIANCE GUARDS VERIFIED.');
}
