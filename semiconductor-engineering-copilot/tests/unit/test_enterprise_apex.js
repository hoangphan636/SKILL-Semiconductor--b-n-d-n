/**
 * ⚡ TEST ENTERPRISE APEX 30 CAPABILITIES
 * Verifies that all 30 Enterprise Capabilities evaluate with mathematical precision.
 */

'use strict';

const assert = require('assert');
const { ENTERPRISE_CAPABILITIES, ENTERPRISE_PILLARS, runApexEnterpriseBenchmark } = require('../../benchmarks/enterprise_apex_suite');

console.log('================================================================');
console.log('RUNNING ENTERPRISE APEX 30-CAPABILITY VERIFICATION SUITE');
console.log('================================================================');

// 1. Structure Verification
assert.strictEqual(ENTERPRISE_PILLARS.length, 6, 'Must define exactly 6 Enterprise Pillars');
assert.strictEqual(ENTERPRISE_CAPABILITIES.length, 30, 'Must define exactly 30 Enterprise Capabilities');

console.log(`\n✔ Verified 6 Enterprise Pillars & 30 Enterprise Capabilities defined.`);

// 2. Individual Pillar Distribution Verification
for (let p = 1; p <= 6; p++) {
  const capsInPillar = ENTERPRISE_CAPABILITIES.filter(c => c.pillarId === p);
  assert.strictEqual(capsInPillar.length, 5, `Pillar ${p} must have exactly 5 capabilities`);
  console.log(`  [PASS] Pillar ${p}: 5/5 capabilities registered`);
}

// 3. Execution & Mathematical Evaluator Benchmark
console.log('\n--- Executing Mathematical Evaluators ---');
const benchmarkResult = runApexEnterpriseBenchmark();

for (const res of benchmarkResult.results) {
  assert.strictEqual(res.passed, true, `Capability ${res.id} must pass evaluation`);
  console.log(`  [PASS] ${res.id}: ${res.name} -> ${res.status}`);
}

assert.strictEqual(benchmarkResult.passedCount, 30);
assert.strictEqual(benchmarkResult.allPassed, true);

console.log('\n================================================================');
console.log(`ENTERPRISE BENCHMARK RESULTS: ${benchmarkResult.passedCount}/30 PASSED (100% CLEAN)`);
console.log('================================================================\n');
