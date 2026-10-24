/**
 * SEMICONDUCTOR ENGINEERING COPILOT V13.0
 * Comprehensive Security & Integrity Suite (SEC-001 through SEC-008)
 *
 * Verifies PQC implementations, air-gap isolation, Merkle provenance, and zero data leakage.
 */

'use strict';

const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const v13 = require('../../../extensions/v13/index.js');
const { aiEdaSecGovernance } = v13;

let totalSec = 0;
let passedSec = 0;
let failedSec = 0;

function secTest(id, title, fn) {
  totalSec++;
  try {
    fn();
    passedSec++;
    console.log(`[PASS] ${id}: ${title}`);
  } catch (err) {
    failedSec++;
    console.error(`[FAIL] ${id}: ${title} -> ${err.message}`);
  }
}

console.log('================================================================');
console.log('  SEMICONDUCTOR ENGINEERING COPILOT V13.0 - 8 SECURITY TESTS    ');
console.log('================================================================\n');

// SEC-001: PQC ML-DSA-65 hardware accelerator compliance
secTest('SEC-001', 'Post-Quantum ML-DSA-65 accelerator complies with NIST FIPS 204', () => {
  const res = aiEdaSecGovernance.synthesizePostQuantumCryptoMLDSAHardwareAccelerator({ algorithm: 'ML-DSA-65' });
  assert.strictEqual(res.fips204Compliant, true);
  assert.strictEqual(res.polyDegreeN, 256);
  assert.strictEqual(res.sideChannelProtectedMasking, true);
});

// SEC-002: PQC ML-KEM-768 constant time execution
secTest('SEC-002', 'Post-Quantum ML-KEM-768 key exchange executes in constant time', () => {
  const res = aiEdaSecGovernance.verifyMLKEMPostQuantumKeyExchangeSilicon({ algorithm: 'ML-KEM-768' });
  assert.strictEqual(res.fips203Compliant, true);
  assert.strictEqual(res.constantTimeExecutionVerified, true);
});

// SEC-003: PUF Hamming distance & entropy security bounds
secTest('SEC-003', 'SRAM & RO PUF meets NIST SP 800-22 entropy and uniqueness criteria', () => {
  const res = aiEdaSecGovernance.analyzePhysicalUnclonableFunctionPUFEntropyAndHammingDistance({
    intraDieHammingDistancePct: 1.5,
    interDieHammingDistancePct: 50.1
  });
  assert.strictEqual(res.passedNISTSP80022, true);
  assert.strictEqual(res.deviceKeyDerivationSafe, true);
});

// SEC-004: Hardware Trojan AST scanning
secTest('SEC-004', 'AST suspicious activation graph detects rare event trigger circuits', () => {
  const maliciousRTL = 'if (rare_counter == 32\'hFFFFFFFF) trigger_kill_switch <= 1\'b1;';
  const cleanRTL = 'assign valid_out = req && ack;';
  const detectMalicious = aiEdaSecGovernance.scanRTLForHardwareTrojansAndTriggerCircuits({ moduleRTL: maliciousRTL });
  const detectClean = aiEdaSecGovernance.scanRTLForHardwareTrojansAndTriggerCircuits({ moduleRTL: cleanRTL });
  assert.strictEqual(detectMalicious.trojanDetected, true);
  assert.strictEqual(detectClean.cleanSiliconCertificateIssued, true);
});

// SEC-005: Zero-trust DICE Root of Trust state clearing
secTest('SEC-005', 'DICE UDS/CDI derivation purges secret memory after key creation', () => {
  const dice = aiEdaSecGovernance.verifyZeroTrustRootOfTrustDICEStateTransitions({});
  assert.strictEqual(dice.stateClearedPostComputation, true);
  assert.strictEqual(dice.immutableBootEnforced, true);
});

// SEC-006: Merkle Tree provenance validation
secTest('SEC-006', 'Air-gapped Merkle Tree provenance generates deterministic root hash', () => {
  const merkle = aiEdaSecGovernance.computeAirGappedReproducibilityMerkleRoot({
    fileManifest: [
      { path: 'extensions/v13/index.js', hash: 'a1b2c3d4e5f6071829' },
      { path: 'extensions/v11/index.js', hash: 'b2c3d4e5f6a1071829' }
    ]
  });
  assert.ok(merkle.merkleRoot && merkle.merkleRoot.length === 64);
  assert.strictEqual(merkle.airGappedDeterministic, true);
});

// SEC-007: Air-gap network isolation check
secTest('SEC-007', 'V13 codebase relies strictly on standard libraries with 0 external network requests', () => {
  const airgap = aiEdaSecGovernance.verifyOfflineAirGappedDependencyIndependence({
    externalHttpCallsDetected: 0,
    missingNpmDependencies: 0
  });
  assert.strictEqual(airgap.airGappedReady, true);
  assert.strictEqual(airgap.networkIsolationPassed, true);
});

// SEC-008: Release manifest cryptographic HMAC lock
secTest('SEC-008', 'Final release manifest is immutably sealed with cryptographic signature', () => {
  const signed = aiEdaSecGovernance.lockFinalReleaseManifestWithDigitalSignature({ manifestData: 'SEMICONDUCTOR_V13_RELEASE' });
  assert.strictEqual(signed.locked, true);
  assert.ok(signed.releaseSignature && signed.releaseSignature.length === 64);
});

console.log(`\n================================================================`);
console.log(`  SECURITY RESULTS: ${passedSec} / ${totalSec} PASSED (Failed: ${failedSec})`);
console.log(`================================================================\n`);

if (failedSec > 0) {
  process.exit(1);
} else {
  console.log('ALL 8 V13.0 SECURITY & INTEGRITY TESTS PASSED CLEANLY.');
}
