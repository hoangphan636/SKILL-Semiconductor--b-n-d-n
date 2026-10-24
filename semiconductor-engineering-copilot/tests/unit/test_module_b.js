/**
 * Unit Tests for Module B: Formal Verification and Advanced Debug (Capabilities 11-20)
 */

const { FormalDebugModule } = require('../../modules/v3/formal-debug/formal_debug');

function runModuleBTests(assert) {
  console.log('Testing Module B: Formal Verification and Advanced Debug');
  const modB = new FormalDebugModule();

  // 11. Formal Property Assistant
  const prop = modB.generateFormalProperty('IMPLICATION', 'req', 'ack');
  assert(prop.sva_code.includes('req |-> ##1 ack'), '11. Formal Property Assistant generates implication SVA');

  // 12. Counterexample Interpreter
  const trace = { steps: [{ cycle: 1, assertion_failed: false }, { cycle: 2, assertion_failed: true, property_name: 'p_req_ack', violating_signal: 'ack' }] };
  const traceInterp = modB.interpretCounterexample(trace);
  assert(traceInterp.failure_cycle === 2 && traceInterp.failing_property === 'p_req_ack', '12. Counterexample Interpreter isolates failing cycle');

  // 13. Equivalence Checking Orchestrator
  const eqOk = modB.checkEquivalence({ total_compare_points: 50 }, { total_compare_points: 50 });
  const eqBad = modB.checkEquivalence({ total_compare_points: 50 }, { total_compare_points: 48 });
  assert(eqOk.status === 'EQUIVALENT' && eqBad.status === 'NON_EQUIVALENT', '13. Equivalence Checking checks comparison points');

  // 14. Deadlock and Livelock Analyzer
  const cleanGraph = { nodes: [{ id: 'S0' }, { id: 'S1', is_terminal_exit: true }], edges: [{ from: 'S0', to: 'S1' }] };
  const deadGraph = { nodes: [{ id: 'S0' }, { id: 'S_TRAP' }], edges: [{ from: 'S0', to: 'S_TRAP' }] };
  assert(modB.analyzeDeadlock(cleanGraph).is_clean === true, '14. Deadlock Analyzer confirms clean state transition graph');
  assert(modB.analyzeDeadlock(deadGraph).deadlock_states[0] === 'S_TRAP', '14b. Deadlock Analyzer pinpoints trap state');

  // 15. X-Propagation Analyzer
  const traces = [{ name: 'clk', values: '0101' }, { name: 'bus', values: '01X0', first_x_time: 15 }];
  const xOut = modB.analyzeXPropagation(traces);
  assert(xOut.status === 'X_CONTAMINATION_DETECTED' && xOut.contaminated_signals[0].signal === 'bus', '15. X-Propagation Analyzer flags unknown state');

  // 16. Reset Sequence Validator
  assert(modB.validateResetSequence(8, 5).compliant === true, '16. Reset Sequence Validator passes adequate duration');
  assert(modB.validateResetSequence(2, 5).compliant === false, '16b. Reset Sequence Validator rejects brief pulses');

  // 17. Protocol Deadlock Detector
  const deadProt = modB.detectProtocolDeadlock({
    tx: { waits_for_ready_before_valid: true },
    rx: { waits_for_valid_before_ready: true }
  });
  assert(deadProt.status === 'CIRCULAR_DEADLOCK_RISK', '17. Protocol Deadlock Detector catches circular dependency');

  // 18. Assertion Quality Analyzer
  const svaList = ['assert property (@(posedge clk) req |-> ##1 ack);', 'assert property (1 |-> val);'];
  const svaQual = modB.analyzeAssertionQuality(svaList);
  assert(svaQual.vacuous_risks_count === 1 && svaQual.quality_score === 80, '18. Assertion Quality Analyzer detects vacuous antecedents');

  // 19. Formal Coverage Advisor
  const fcov = modB.adviseFormalCoverage(['STATE_ILLEGAL'], []);
  assert(fcov.unreachable_states_count === 1 && fcov.status.includes('COVERAGE_HOLES'), '19. Formal Coverage Advisor flags unreachable states');

  // 20. Debug Reproducer Generator
  const repro = modB.generateDebugReproducer({ test_name: 'test_fifo_overflow', seed: 42 });
  assert(repro.reproducer_script.includes('SEED=42') && repro.reproducer_script.includes('+SEED=$SEED'), '20. Debug Reproducer Generator generates runnable script');
}

module.exports = { runModuleBTests };
