/**
 * Unit Tests for Module C: Change Management and Reliability (Capabilities 21-30)
 */

const { ChangeReliabilityModule } = require('../../modules/v3/change-reliability/change_reliability');

function runModuleCTests(assert) {
  console.log('Testing Module C: Change Management and Reliability');
  const modC = new ChangeReliabilityModule();

  // 21. RTL Change Impact Analyzer
  const impact = modC.analyzeChangeImpact(['rtl/alu.v'], { top_core: ['alu', 'regfile'], dma: ['fifo'] });
  assert(impact.impacted_modules.includes('top_core'), '21. Change Impact Analyzer propagates dependency impact to top_core');

  // 22. ECO Planning Assistant
  const eco = modC.planEco({ violation_type: 'HOLD', slack_ns: -0.12 });
  assert(eco.recommended_strategy.includes('INSERT_DELAY_BUFFERS'), '22. ECO Planning Assistant recommends delay buffers for hold');

  // 23. Patch Risk Scorer
  const risk = modC.scorePatchRisk({ additions: 5, deletions: 2, touches_clock_or_reset: true });
  assert(risk.risk_level === 'MEDIUM' && risk.risk_score > 40, '23. Patch Risk Scorer weights clock/reset touches heavily');

  // 24. Golden Baseline Manager
  const base = modC.createGoldenBaseline('REL_1_0', { 'top.v': 'content1', 'top.sdc': 'content2' });
  assert(base.baseline_id.startsWith('BASE_REL_1_0_') && base.sha256_tree_hash.length === 64, '24. Golden Baseline Manager locks cryptographic tree hash');

  // 25. Configuration Matrix Tester
  const cfg = modC.generateConfigMatrix({ DATA_WIDTH: [16, 32], DEPTH: [8, 16] });
  assert(cfg.total_combinations === 4 && cfg.configurations.length === 4, '25. Configuration Matrix Tester computes Cartesian product');

  // 26. Build Dependency Integrity Checker
  const depPass = modC.checkBuildDependencies('target: top.v tb.sv');
  const depFail = modC.checkBuildDependencies('CIRCULAR_DEP detected');
  assert(depPass.status === 'INTEGRITY_PASS' && depFail.status === 'INTEGRITY_FAIL', '26. Build Dependency Checker identifies circular rules');

  // 27. Reproducibility Auditor
  const repOk = modC.auditReproducibility({ output_hash: 'abc' }, { output_hash: 'abc' });
  const repFail = modC.auditReproducibility({ output_hash: 'abc' }, { output_hash: 'def' });
  assert(repOk.is_reproducible === true && repFail.is_reproducible === false, '27. Reproducibility Auditor flags non-deterministic runs');

  // 28. Artifact Integrity Verifier (With Path Traversal Security Test)
  const content = 'clean_netlist_text';
  const validHash = require('crypto').createHash('sha256').update(content).digest('hex');
  const artOk = modC.verifyArtifactIntegrity('netlist.v', validHash, content);
  const artTrav = modC.verifyArtifactIntegrity('../secret.v', validHash, content);
  assert(artOk.status === 'INTEGRITY_VERIFIED', '28. Artifact Integrity Verifier validates valid hash');
  assert(artTrav.status === 'SECURITY_VIOLATION', '28b. Artifact Integrity Verifier blocks path traversal (../)');

  // 29. Engineering Review Assistant
  const chk = modC.generateReviewChecklist('STA');
  assert(chk.checklist_items.includes('WNS >= 0.000ns'), '29. Engineering Review Assistant returns STA sign-off checklist');

  // 30. Rollback Planner
  const roll = modC.planRollback('REL_BUGGY_V2', 'BASE_STABLE_V1');
  assert(roll.status === 'ROLLBACK_PLANNED' && roll.rollback_steps.length >= 4, '30. Rollback Planner emits phased restoration steps');
}

module.exports = { runModuleCTests };
