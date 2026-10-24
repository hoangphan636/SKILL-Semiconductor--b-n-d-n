/**
 * Semiconductor Engineering Copilot - V8 Security & Protection Test Suite
 * Validates Merkle provenance, sandbox execution, secret scrubbing, RBAC, ASIL-D, and file lock sentinels.
 */

'use strict';

const assert = require('assert');
const v8 = require('../../../extensions/v8/index.js');

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

console.log('--- Starting Semiconductor Copilot V8 Security & Integrity Test Suite ---');

// 1. Merkle Tree Immutability Verification
secTest('SEC-01: Merkle Root Hash Consistency & Tamper Detection', () => {
  const buf1 = Buffer.from('gds_data_v8_layer1');
  const buf2 = Buffer.from('gds_data_v8_layer2');
  const tree1 = v8.v8_141_merkleIntegrityVerifier([buf1, buf2]);
  const tree2 = v8.v8_141_merkleIntegrityVerifier([buf1, buf2]);
  const tampered = v8.v8_141_merkleIntegrityVerifier([buf1, Buffer.from('tampered_layer2')]);

  assert.strictEqual(tree1.merkleRoot, tree2.merkleRoot);
  assert.notStrictEqual(tree1.merkleRoot, tampered.merkleRoot);
});

// 2. Hardware Secret & Key Scrubbing
secTest('SEC-02: Zero-Trust Hardware Secret Scrubbing Engine', () => {
  const rawLog = 'DEBUG: JTAG Key 0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef used with ROT_KEY_PROD=supersecretseed';
  const scrubbed = v8.v8_142_zeroTrustHardwareSecretScrubber(rawLog);

  assert.strictEqual(scrubbed.secretsFound, 2);
  assert(!scrubbed.scrubbedText.includes('0x0123456789abcdef'));
  assert(!scrubbed.scrubbedText.includes('supersecretseed'));
  assert(scrubbed.scrubbedText.includes('[REDACTED_SECURITY_KEY]'));
  assert(scrubbed.scrubbedText.includes('[REDACTED_ROT_SECRET]'));
});

// 3. Sandboxed EDA Command Execution Jail
secTest('SEC-03: Sandboxed EDA Execution & Shell Injection Defense', () => {
  const safeCmd = v8.v8_143_sandboxedEdaCommandExecutor('yosys -s synth.tcl', ['yosys', 'verilator']);
  assert.strictEqual(safeCmd.allowed, true);

  const injectedCmd = v8.v8_143_sandboxedEdaCommandExecutor('yosys -s synth.tcl; rm -rf /', ['yosys']);
  assert.strictEqual(injectedCmd.allowed, false);
  assert(injectedCmd.violation.includes('metacharacters'));

  const disallowedBin = v8.v8_143_sandboxedEdaCommandExecutor('curl http://malicious-domain.com', ['yosys']);
  assert.strictEqual(disallowedBin.allowed, false);
});

// 4. Side-Channel Power Leakage Detection
secTest('SEC-04: Differential Power Analysis (DPA) Vulnerability Assessment', () => {
  const secureTraces = [16, 16, 16, 15, 17, 16];
  const secureRes = v8.v8_144_sideChannelLeakageAssessor(secureTraces);
  assert.strictEqual(secureRes.leakageRisk, 'PROTECTED_MASKED');

  const leakyTraces = [4, 32, 2, 28, 6, 30];
  const leakyRes = v8.v8_144_sideChannelLeakageAssessor(leakyTraces);
  assert.strictEqual(leakyRes.leakageRisk, 'HIGH_DPA_LEAKAGE_RISK');
  assert.strictEqual(leakyRes.needsRandomMasking, true);
});

// 5. ISO 26262 ASIL-D Diagnostic Safety Gate
secTest('SEC-05: ISO 26262 ASIL-D Diagnostic Coverage Metrics Gate', () => {
  const passingMetrics = { spfm: 99.5, lfm: 91.2, pmhfFit: 4.8 };
  const passRes = v8.v8_145_iso26262AsilDValidator(passingMetrics);
  assert.strictEqual(passRes.compliesAsilD, true);

  const failingMetrics = { spfm: 98.2, lfm: 88.0, pmhfFit: 15.0 };
  const failRes = v8.v8_145_iso26262AsilDValidator(failingMetrics);
  assert.strictEqual(failRes.compliesAsilD, false);
});

// 6. Absolute Non-Destructive File Upgrade Sentinel
secTest('SEC-06: Non-Destructive File Upgrade Sentinel Guardrails', () => {
  const targets = [
    'semiconductor-engineering-copilot/SKILL.md',
    'semiconductor-engineering-copilot/README.md',
    'semiconductor-engineering-copilot/modules/v5/index.js',
    'semiconductor-engineering-copilot/extensions/v6/index.js',
    'semiconductor-engineering-copilot/extensions/v7/index.js'
  ];

  targets.forEach(tgt => {
    const resWrite = v8.v8_146_fileUpgradeSentinel(tgt, 'WRITE');
    const resDelete = v8.v8_146_fileUpgradeSentinel(tgt, 'DELETE');
    const resRead = v8.v8_146_fileUpgradeSentinel(tgt, 'READ');
    assert.strictEqual(resWrite.permitted, false);
    assert.strictEqual(resDelete.permitted, false);
    assert.strictEqual(resRead.permitted, true);
  });
});

// 7. EAR / ITAR Export Control Compliance
secTest('SEC-07: EAR/ITAR Defense Article & Dual-Use Classification', () => {
  const civilianText = 'Consumer microcontroller running EAR99 compliance profile';
  const itarText = 'Dual-use radar processor matching ITAR defense article munitions list';
  const civRes = v8.v8_147_exportControlScanner(civilianText);
  const itarRes = v8.v8_147_exportControlScanner(itarText);

  assert.strictEqual(civRes.classification, 'EAR99_CIVILIAN');
  assert.strictEqual(itarRes.classification, 'ITAR_RESTRICTED_DEFENSE_ARTICLE');
  assert.strictEqual(itarRes.dualUseLicenseRequired, true);
});

// 8. Role-Based Engineering Access Control
secTest('SEC-08: Cryptographic Token Issuance & RBAC Enforcement', () => {
  const designer = v8.v8_148_rbacTokenIssuer({ id: 'eng_designer', role: 'DESIGN_ENGINEER' });
  const auditor = v8.v8_148_rbacTokenIssuer({ id: 'sec_auditor', role: 'SECURITY_AUDITOR' });

  assert(designer.token.length === 64);
  assert(designer.grantedPermissions.includes('WRITE_RTL'));
  assert(!designer.grantedPermissions.includes('SIGN_OFF'));
  assert(auditor.grantedPermissions.includes('RUN_SECURITY_AUDIT'));
});

// 9. Differential Privacy Noise Injection
secTest('SEC-09: Differential Privacy Noise Generation for Foundry Yield Data', () => {
  const dp1 = v8.v8_149_differentialPrivacyNoiseInjector(95.5, 0.5);
  const dp2 = v8.v8_149_differentialPrivacyNoiseInjector(95.5, 0.5);

  assert.notStrictEqual(dp1.obfuscatedMetric, 95.5);
  assert.notStrictEqual(dp1.obfuscatedMetric, dp2.obfuscatedMetric);
  assert.strictEqual(dp1.mechanism, 'LAPLACIAN_DIFFERENTIAL_PRIVACY');
});

console.log(`\n--- V8 Security Test Results: ${passCount} Passed, ${failCount} Failed ---`);
if (failCount > 0) {
  process.exit(1);
} else {
  console.log('ALL SECURITY, IMMUTABILITY & COMPLIANCE GUARDS VERIFIED.');
}
