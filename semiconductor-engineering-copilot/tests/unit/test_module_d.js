/**
 * Unit Tests for Module D: Power, DFT, Physical and Manufacturing Intelligence (Capabilities 31-40)
 */

const { PowerPhysicalModule } = require('../../modules/v3/power-physical/power_physical');

function runModuleDTests(assert) {
  console.log('Testing Module D: Power, DFT, Physical and Manufacturing Intelligence');
  const modD = new PowerPhysicalModule();

  // 31. Power Intent Reviewer (UPF/CPF)
  const upfOk = 'create_power_domain PD_CORE\ncreate_power_domain PD_TOP\nset_isolation iso1\nset_level_shifter ls1';
  const upfBad = 'create_power_domain PD_CORE\ncreate_power_domain PD_TOP';
  assert(modD.reviewPowerIntent(upfOk).compliant === true, '31. Power Intent Reviewer validates multi-voltage UPF with isolation');
  assert(modD.reviewPowerIntent(upfBad).compliant === false, '31b. Power Intent Reviewer flags missing isolation rules');

  // 32. Low-Power Verification Planner
  const lpPlan = modD.planLowPowerVerification(['PD_CORE', 'PD_MEM']);
  assert(lpPlan.total_power_scenarios === 4 && lpPlan.scenarios.length === 4, '32. Low-Power Verification Planner generates ON/OFF combinations');

  // 33. IR-Drop Report Assistant
  const irOk = 'Worst IR Drop: 32.5 mV in core region';
  const irBad = 'Worst IR Drop: 68.2 mV in core region';
  assert(modD.parseIrDropReport(irOk, 50.0).compliant === true, '33. IR-Drop Assistant passes 32.5mV (<50mV)');
  assert(modD.parseIrDropReport(irBad, 50.0).compliant === false, '33b. IR-Drop Assistant flags 68.2mV drop');

  // 34. Electromigration Report Analyzer
  const emOk = 'EM Check Complete. Total violations: 0';
  const emBad = 'EM VIOLATION on net VDD_M2 at (10, 40)';
  assert(modD.parseEmReport(emOk).compliant === true, '34. Electromigration Analyzer confirms 0 violations');
  assert(modD.parseEmReport(emBad).compliant === false, '34b. Electromigration Analyzer flags EM violation');

  // 35. Clock Tree Quality Reviewer
  const cts = modD.reviewClockTree(0.080, 1.2, 0.1);
  assert(cts.status === 'CTS_QUALITY_EXCELLENT' && cts.skew_target_met === true, '35. Clock Tree Quality Reviewer evaluates CTS skew & latency');

  // 36. Parasitic Extraction Consistency Checker
  const spefClean = 'D_NET 500\n*C 1.2e-15 F';
  const spefBad = 'D_NET 500\n*C NEGATIVE_CAP';
  assert(modD.checkParasiticConsistency(spefClean).status === 'SPEF_CONSISTENT', '36. Parasitic Consistency Checker validates normal SPEF');
  assert(modD.checkParasiticConsistency(spefBad).has_negative_capacitance === true, '36b. Parasitic Consistency Checker flags negative capacitance');

  // 37. Scan Architecture Reviewer
  const scan = modD.reviewScanArchitecture(16, 750);
  assert(scan.status === 'SCAN_ARCHITECTURE_BALANCED' && scan.test_time_cost_tier === 'OPTIMAL', '37. Scan Architecture Reviewer validates balanced scan depth');

  // 38. ATPG Result Analyzer
  const atpgOk = 'Test Coverage: 99.4 % with stuck-at fault models';
  const atpgBad = 'Test Coverage: 94.1 % with stuck-at fault models';
  assert(modD.parseAtpgReport(atpgOk, 98.0).compliant === true, '38. ATPG Result Analyzer approves 99.4% coverage (>=98%)');
  assert(modD.parseAtpgReport(atpgBad, 98.0).compliant === false, '38b. ATPG Result Analyzer flags coverage under-target');

  // 39. Silicon Bring-up Planner
  const bringup = modD.planSiliconBringup([0.8, 0.9, 1.0], [500, 800, 1000]);
  assert(bringup.total_shmoo_points === 9, '39. Silicon Bring-up Planner builds 3x3 voltage-frequency Shmoo matrix');

  // 40. Yield Data Analysis Assistant
  const yld = modD.analyzeYieldLot(1000, 930);
  assert(yld.yield_percentage === 93.0 && yld.yield_grade === 'EXCELLENT', '40. Yield Data Assistant grades 93% wafer lot as EXCELLENT');
}

module.exports = { runModuleDTests };
