/**
 * V6 SMOKE TEST SUITE - 14 SCENARIOS (ST-001 THROUGH ST-014)
 * Validates system readiness, backward compatibility, and feature accessibility
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

const v6 = require('../../../extensions/v6/index');
const v5 = require('../../../modules/v5/index');

let passed = 0;
let failed = 0;

function runSmokeTest(id, name, fn) {
  try {
    fn();
    console.log(`[PASS] ${id}: ${name}`);
    passed++;
  } catch (err) {
    console.error(`[FAIL] ${id}: ${name} ->`, err.message);
    failed++;
  }
}

console.log('=== STARTING V6 SMOKE TEST SUITE (14 SCENARIOS) ===');

// ST-001: Legacy Skill Load
runSmokeTest('ST-001', 'Legacy Skill Load & Instructions Preservation', () => {
  const skillPath = path.resolve(__dirname, '../../../SKILL.md');
  assert(fs.existsSync(skillPath), 'SKILL.md must exist in root');
  const skillContent = fs.readFileSync(skillPath, 'utf8');
  assert(skillContent.length > 500, 'SKILL.md must not be empty or truncated');
  assert(skillContent.includes('semiconductor-engineering-copilot'), 'SKILL.md must contain proper identifier');
});

// ST-002: Legacy Feature Preservation
runSmokeTest('ST-002', 'Legacy Feature Modules Availability (V1-V5)', () => {
  assert(v6.legacyPlatform !== undefined, 'Legacy platform must be linked');
  assert.strictEqual(v6.legacyPlatform.version, '5.0.0', 'Legacy platform version must be 5.0.0');
  assert(v6.legacyPlatform.groups !== undefined, 'V5 groups must exist');
  assert(Object.keys(v6.legacyPlatform.groups).length === 10, 'V5 must retain all 10 feature groups');
});

// ST-003: V6 Feature Registry Check
runSmokeTest('ST-003', 'V6 150 Feature Registry Integrity', () => {
  assert(Array.isArray(v6.FEATURE_REGISTRY_V6), 'FEATURE_REGISTRY_V6 must be an array');
  assert.strictEqual(v6.FEATURE_REGISTRY_V6.length, 150, 'Must have exactly 150 V6 features');
  const uniqueIds = new Set(v6.FEATURE_REGISTRY_V6.map(f => f.id));
  assert.strictEqual(uniqueIds.size, 150, 'All 150 feature IDs must be unique');
});

// ST-004: Core Workflow Execution
runSmokeTest('ST-004', 'Core Multi-Domain Workflow Execution', () => {
  const cat1 = v6.categories.cat1_advanced_microarchitecture;
  const cat2 = v6.categories.cat2_noc_memory_and_interconnect;
  const res1 = cat1.simulateSuperscalarFetchPipeline(4, 1);
  const res2 = cat2.routeMeshNocFlits({ x: 0, y: 0 }, { x: 1, y: 1 }, 2);
  assert.strictEqual(res1.status, 'FETCH_PIPELINE_SIMULATED');
  assert.strictEqual(res2.status, 'FLIT_ROUTED_XY');
});

// ST-005: RTL Analysis Capability
runSmokeTest('ST-005', 'RTL Analysis & Hallucination Guard', () => {
  const cat11 = v6.categories.cat11_ai_model_quality_and_evaluation;
  const res = cat11.detectRtlCodeHallucinationGrounding('assign c = a & b;', ['a', 'b', 'c']);
  assert.strictEqual(res.status, 'RTL_GROUNDING_VERIFIED');
  assert(res.groundingConfidenceScore > 0.9, 'Confidence score should be above 0.9');
});

// ST-006: Mock EDA Execution Pipeline
runSmokeTest('ST-006', 'EDA Execution Pipeline Scheduling', () => {
  const cat9 = v6.categories.cat9_data_pipelines_and_distributed_eda;
  const res = cat9.optimizeSlurmBatchJobArray(100, 25);
  assert.strictEqual(res.status, 'SLURM_ARRAY_DISPATCHED');
  assert.strictEqual(res.totalJobsQueued, 100);
});

// ST-007: Report Parsing & Metrics
runSmokeTest('ST-007', 'Observability & Metrics Aggregation', () => {
  const cat13 = v6.categories.cat13_observability_and_engineering_analytics;
  const res = cat13.aggregateVerificationFailureHeatmap({ alu: 5, fpu: 1 });
  assert.strictEqual(res.status, 'HEATMAP_GENERATED');
  assert.strictEqual(res.highestFailureModule, 'alu');
});

// ST-008: MCP Contract Adherence
runSmokeTest('ST-008', 'Deterministic Data Contracts Across Categories', () => {
  const sample = v6.FEATURE_REGISTRY_V6[0];
  assert(sample.id && sample.name && sample.category && typeof sample.fn === 'function');
});

// ST-009: Hardware Security & Secret Scanning Guardrails
runSmokeTest('ST-009', 'Hardware Security & Secret Scanning Guardrails', () => {
  const cat15 = v6.categories.cat15_enterprise_governance_and_continuous_validation;
  const res = cat15.scanHardcodedCredentialsSecretRepository(25);
  assert.strictEqual(res.status, 'SECRET_SCAN_CLEAN');
});

// ST-010: Regression Suite Integrity
runSmokeTest('ST-010', 'Historical Test Files Intact on Disk', () => {
  const testsDir = path.resolve(__dirname, '../../');
  assert(fs.existsSync(path.join(testsDir, 'unit', 'run_all_v5_tests.js')), 'v5 unit tests must exist');
  assert(fs.existsSync(path.join(testsDir, 'unit', 'run_all_v4_tests.js')), 'v4 unit tests must exist');
  assert(fs.existsSync(path.join(testsDir, 'unit', 'run_all_v3_tests.js')), 'v3 unit tests must exist');
});

// ST-011: File Preservation Audit
runSmokeTest('ST-011', 'Non-Destructive File Namespace Audit', () => {
  const cat10 = v6.categories.cat10_test_engineering_and_non_destructive_upgrade;
  const res = cat10.verifyAdditiveUpgradeArtifactNamespaceIsolation(
    ['modules/v1', 'modules/v2', 'modules/v3', 'modules/v4', 'modules/v5'],
    ['extensions/v6']
  );
  assert.strictEqual(res.status, 'NAMESPACES_CLEAN_ISOLATED');
  assert.strictEqual(res.isolated, true);
});

// ST-012: Quality Gate Telemetry
runSmokeTest('ST-012', 'Continuous Quality Gate Logging', () => {
  const cat10 = v6.categories.cat10_test_engineering_and_non_destructive_upgrade;
  const res = cat10.recordContinuousQualityGateTelemetryLog(100, true);
  assert.strictEqual(res.status, 'QUALITY_GATE_PASS');
  assert.strictEqual(res.testPassRatePct, 100);
});

// ST-013: Rollback Readiness
runSmokeTest('ST-013', 'Rollback Sandbox Environment Validation', () => {
  const cat10 = v6.categories.cat10_test_engineering_and_non_destructive_upgrade;
  const res = cat10.isolateRollbackSandboxEnvironment('SNAPSHOT_V5_STABLE', true);
  assert.strictEqual(res.status, 'ROLLBACK_SANDBOX_VERIFIED');
  assert.strictEqual(res.productionWorkspaceUntouched, true);
});

// ST-014: Release Readiness Signoff
runSmokeTest('ST-014', 'Master Tapeout Signoff Evidence Ledger Generation', () => {
  const cat15 = v6.categories.cat15_enterprise_governance_and_continuous_validation;
  const res = cat15.produceMasterTapeoutSignoffEvidenceLedger(true);
  assert.strictEqual(res.status, 'MASTER_TAPEOUT_CLEARED');
  assert.strictEqual(res.verdict, 'UNANIMOUS_TAPE_OUT_GO');
});

console.log('=== V6 SMOKE TEST SUMMARY ===');
console.log(`TOTAL: 14 | PASSED: ${passed} | FAILED: ${failed}`);

if (failed > 0) {
  process.exit(1);
}
