/**
 * Unit Tests for Module E: Unit Testing and Quality Engineering (Capabilities 41-50)
 */

const { TestingQualityModule } = require('../../modules/v3/testing-quality/testing_quality');

function runModuleETests(assert) {
  console.log('Testing Module E: Unit Testing and Quality Engineering');
  const modE = new TestingQualityModule();

  // 41. Skill Contract Test Suite
  const validCat = [{ name: 'lint_rtl', description: 'desc', inputSchema: {} }];
  const invalidCat = [{ name: 'bad_tool', description: 'desc' }];
  assert(modE.runSkillContractSuite(validCat).status === 'ALL_CONTRACTS_VALID', '41. Skill Contract Tester validates conforming tool entries');
  assert(modE.runSkillContractSuite(invalidCat).status === 'CONTRACT_VIOLATIONS', '41b. Skill Contract Tester flags missing inputSchema');

  // 42. Schema Compatibility Tester
  const schema = { required: ['top_module', 'files'] };
  assert(modE.testSchemaCompatibility(schema, { top_module: 'top', files: [] }).compliant === true, '42. Schema Compatibility passes valid payload');
  assert(modE.testSchemaCompatibility(schema, { top_module: 'top' }).compliant === false, '42b. Schema Compatibility flags missing required fields');

  // 43. Mock EDA Simulator
  const simPass = modE.mockEdaSimulation(['vcs', 'top.v']);
  const simFail = modE.mockEdaSimulation(['vcs', '+UVM_ERROR', 'top.v']);
  assert(simPass.exit_code === 0 && simPass.status === 'SIMULATION_PASSED', '43. Mock EDA Simulator models exit code 0 on clean run');
  assert(simFail.exit_code === 1 && simFail.status === 'SIMULATION_FAILED', '43b. Mock EDA Simulator models exit code 1 on injected error');

  // 44. Parser Fuzz Testing
  const dummyParser = (str) => { if (typeof str !== 'string') throw new Error('fail'); return str.length; };
  const fuzz = modE.fuzzParser(dummyParser, 20);
  assert(fuzz.fuzz_robust === true && fuzz.crashes_count === 0, '44. Parser Fuzz Tester verifies parser survives extreme input fuzzing');

  // 45. Property-Based Testing
  const propFn = (n) => (n * 2) % 2 === 0;
  const genFn = (i) => i * 7 + 3;
  const pbt = modE.testArithmeticProperty(propFn, genFn, 50);
  assert(pbt.status === 'PROPERTY_HOLDS' && pbt.failures_count === 0, '45. Property-Based Testing validates algebraic invariant over 50 iterations');

  // 46. Golden-File Regression Tests
  assert(modE.testAgainstGoldenFile('exact_match\n', 'exact_match').matches === true, '46. Golden-File Tester validates trimmed equivalence');
  assert(modE.testAgainstGoldenFile('divergent', 'expected').matches === false, '46b. Golden-File Tester detects discrepancy');

  // 47. Fault-Injection Test Harness
  const orig = { wns_slack: 0.15, status: 'PASSED' };
  const faulted = modE.injectFault(orig, 'wns_slack', -0.50);
  assert(faulted.mutated_object.wns_slack === -0.50 && orig.wns_slack === 0.15, '47. Fault Injection mutates target while preserving original state');

  // 48. Security Regression Tests
  const secClean = modE.verifySecurityRules('node run.js', 'src/safe.v');
  const secTrav = modE.verifySecurityRules('node run.js', '../../etc/passwd');
  const secInj = modE.verifySecurityRules('node run.js; rm -rf /', 'src/safe.v');
  assert(secClean.safe === true, '48. Security Regression passes safe command and path');
  assert(secTrav.path_traversal_detected === true && secTrav.safe === false, '48b. Security Regression blocks path traversal attempt');
  assert(secInj.shell_injection_detected === true && secInj.safe === false, '48c. Security Regression blocks shell injection attempt');

  // 49. CI Quality Gate
  const gatePass = modE.evaluateQualityGate({ failed_tests_count: 0, security_violations: 0 });
  const gateFail = modE.evaluateQualityGate({ failed_tests_count: 1, security_violations: 0 });
  assert(gatePass.cleared === true && gatePass.exit_code === 0, '49. CI Quality Gate returns exit code 0 when all checks pass');
  assert(gateFail.cleared === false && gateFail.exit_code === 1, '49b. CI Quality Gate fails pipeline with exit code 1 on test failure');

  // 50. Mutation Score and Test Gap Report
  const mutScore = modE.calculateMutationScore(85, 100);
  assert(mutScore.mutation_score_pct === 85.0 && mutScore.adequacy === 'ADEQUATE_TEST_SUITE', '50. Mutation Score Engine grades 85% as adequate');
}

module.exports = { runModuleETests };
