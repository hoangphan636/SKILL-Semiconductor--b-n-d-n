/**
 * Semiconductor Engineering Copilot - V8 Regression & Legacy Contract Test Suite
 * Strictly validates backward compatibility across V1.0, V2.0, V3.0, V4.0, V5.0, V6.0, and V7.0
 */

'use strict';

const assert = require('assert');
const v8 = require('../../../extensions/v8/index.js');
const v7 = require('../../../extensions/v7/index.js');
const v6 = require('../../../extensions/v6/index.js');
const v5 = require('../../../modules/v5/index.js');
const v4 = require('../../../modules/v4/index.js');
const v3 = require('../../../modules/v3/design-architecture/design_architecture.js');
const v2 = require('../../../modules/agent-intelligence/agent_engine.js');
const v1 = require('../../../adapters/mcp/eda_mcp_server.js');

let passCount = 0;
let failCount = 0;
const failures = [];

function check(name, fn) {
  try {
    fn();
    passCount++;
  } catch (err) {
    failCount++;
    failures.push({ name, error: err.message });
    console.error(`[FAIL] ${name}: ${err.message}`);
  }
}

console.log('--- Starting Semiconductor Copilot V8 Regression & Contract Test Suite ---');

// 1. Verify Master V8 Packaging & Metadata
check('REG-01: V8 Platform Signature & Integrity', () => {
  assert.strictEqual(v8.version, '8.0.0');
  assert.strictEqual(v8.registry.length, 150);
  assert.strictEqual(v8.categories.length, 15);
  assert(v8.legacyPlatform !== null);
});

// 2. Verify V7 Foundation Availability
check('REG-02: V7 Legacy Platform Backward Compatibility', () => {
  assert.strictEqual(v7.version, '7.0.0');
  assert.strictEqual(v7.FEATURE_REGISTRY_V7.length, 150);
  assert(typeof v7.categories.cat3_cdc_rdc_reset_architecture.verifyDualFlipFlopSynchronizerMetastability === 'function');
  assert(typeof v7.categories.cat1_rtl_intelligence_hdl_quality.lintSystemVerilogInterfaceModports === 'function');
});

// 3. Verify V6 Foundation Availability
check('REG-03: V6 Subsystem Compatibility', () => {
  assert.strictEqual(v6.version, '6.0.0');
  assert.strictEqual(v6.FEATURE_REGISTRY_V6.length, 150);
  assert(typeof v6.categories.cat1_advanced_microarchitecture.simulateSuperscalarFetchPipeline === 'function');
});

// 4. Verify V5 Foundation Availability
check('REG-04: V5 Subsystem Compatibility', () => {
  assert.strictEqual(v5.version, '5.0.0');
  assert.strictEqual(Object.keys(v5.groups).length, 10);
});

// 5. Verify V4 Foundation Availability
check('REG-05: V4 Subsystem Compatibility', () => {
  assert.strictEqual(v4.version, '4.0.0');
  assert(v4.groups !== undefined);
});

// 6. Verify V3 Foundation Availability
check('REG-06: V3 Subsystem Compatibility', () => {
  assert(v3 !== undefined);
  assert(typeof v3.DesignArchitectureModule === 'function');
});

// 7. Verify V2 Foundation Availability
check('REG-07: V2 Subsystem Compatibility', () => {
  assert(v2 !== undefined);
  assert(typeof v2.AgentIntelligenceEngine === 'function');
});

// 8. Verify V1 Adapter Availability
check('REG-08: V1 MCP Server Compatibility', () => {
  assert(v1 !== undefined);
});

// 9. Verify Non-Destructive Invariance
check('REG-09: File Immutability Invariance Check', () => {
  const blockedSKILL = v8.v8_146_fileUpgradeSentinel('semiconductor-engineering-copilot/SKILL.md', 'WRITE');
  const blockedREADME = v8.v8_146_fileUpgradeSentinel('semiconductor-engineering-copilot/README.md', 'WRITE');
  const blockedV7 = v8.v8_146_fileUpgradeSentinel('semiconductor-engineering-copilot/extensions/v7/index.js', 'DELETE');
  assert.strictEqual(blockedSKILL.permitted, false);
  assert.strictEqual(blockedREADME.permitted, false);
  assert.strictEqual(blockedV7.permitted, false);
});

console.log(`\n--- V8 Regression Results: ${passCount} Passed, ${failCount} Failed ---`);
if (failCount > 0) {
  process.exit(1);
} else {
  console.log('ALL REGRESSION & BACKWARD COMPATIBILITY CONTRACTS SATISFIED.');
}
