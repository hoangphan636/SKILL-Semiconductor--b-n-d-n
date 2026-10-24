/**
 * Master V3.0 Test Aggregator
 * Executes all 5 unit test suites (Modules A, B, C, D, E) covering all 50 V3 capabilities.
 */

const { runModuleATests } = require('./test_module_a');
const { runModuleBTests } = require('./test_module_b');
const { runModuleCTests } = require('./test_module_c');
const { runModuleDTests } = require('./test_module_d');
const { runModuleETests } = require('./test_module_e');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${testName}`);
  } else {
    console.error(`  [FAIL] ${testName}`);
  }
}

console.log('=== Running Semiconductor Engineering Copilot V3.0 Unit Test Suite ===\n');

try {
  runModuleATests(assert);
  console.log('');
  runModuleBTests(assert);
  console.log('');
  runModuleCTests(assert);
  console.log('');
  runModuleDTests(assert);
  console.log('');
  runModuleETests(assert);
} catch (e) {
  console.error('Fatal execution error in test suite:', e);
  process.exit(1);
}

console.log(`\n======================================================`);
console.log(`V3.0 Unit Test Summary: ${passedTests}/${totalTests} Tests Passed.`);
console.log(`======================================================`);

if (passedTests !== totalTests) {
  process.exit(1);
}
