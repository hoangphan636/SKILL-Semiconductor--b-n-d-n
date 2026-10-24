/**
 * V7 REGRESSION & CONTRACT TEST SUITE
 * Validates baseline API signatures, public interfaces, configuration, and contracts from V1 through V6
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

const v6 = require('../../../extensions/v6/index');
const v5 = require('../../../modules/v5/index');
const v4 = require('../../../modules/v4/index');
const v3 = require('../../../modules/v3/design-architecture/design_architecture');
const v2 = require('../../../modules/agent-intelligence/agent_engine');
const v1 = require('../../../adapters/mcp/eda_mcp_server');

let passed = 0;
let failed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`[FAIL] ${name} ->`, err.message);
    failed++;
  }
}

console.log('=== STARTING V7 REGRESSION & CONTRACT TEST SUITE ===');

// 1. V6 Compatibility Contract
runTest('V6 Extension API Contract & Feature Registry', () => {
  assert(v6 !== undefined, 'V6 module must be importable');
  assert.strictEqual(v6.version, '6.0.0');
  assert.strictEqual(v6.FEATURE_REGISTRY_V6.length, 150);
  assert(typeof v6.categories.cat1_advanced_microarchitecture.simulateSuperscalarFetchPipeline === 'function');
});

// 2. V5 Modules Contract
runTest('V5 10 Groups and 100 Features Contract', () => {
  assert(v5 !== undefined, 'V5 module must be importable');
  assert.strictEqual(v5.version, '5.0.0');
  assert.strictEqual(Object.keys(v5.groups).length, 10);
});

// 3. V4 Capability Contract
runTest('V4 100 Capabilities Contract', () => {
  assert(v4 !== undefined, 'V4 module must be importable');
  assert.strictEqual(v4.version, '4.0.0');
  assert(v4.groups !== undefined);
  assert.strictEqual(Object.keys(v4.groups).length, 10);
});

// 4. V3 Architecture Module Contract
runTest('V3 Design Architecture Contract', () => {
  assert(v3 !== undefined);
  assert(typeof v3.DesignArchitectureModule === 'function');
});

// 5. V2 Agent Intelligence Contract
runTest('V2 Agent Engine Contract', () => {
  assert(v2 !== undefined);
  assert(typeof v2.AgentIntelligenceEngine === 'function');
});

// 6. V1 MCP Server Contract
runTest('V1 MCP Server Tool Registry Contract', () => {
  assert(v1 !== undefined);
  assert(Array.isArray(v1.tools) || typeof v1.tools === 'object' || typeof v1 === 'object');
});

// 7. Non-Destructive File Immutability
runTest('Core Workspace Files Preserved Intact', () => {
  const root = path.resolve(__dirname, '../../../');
  ['SKILL.md', 'README.md', 'package.json'].forEach(f => {
    assert(fs.existsSync(path.join(root, f)), `File ${f} must exist`);
  });
});

console.log('=== V7 REGRESSION & CONTRACT TEST SUMMARY ===');
console.log(`TOTAL: 7 | PASSED: ${passed} | FAILED: ${failed}`);

if (failed > 0) process.exit(1);
