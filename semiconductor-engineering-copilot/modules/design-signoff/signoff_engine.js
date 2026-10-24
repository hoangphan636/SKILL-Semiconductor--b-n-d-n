/**
 * semiconductor-engineering-copilot V2.0
 * Capability Set D: Design Optimization and Sign-off
 * Modules 31-40: PPA Optimization Advisor, Critical Path Explainer, Constraint Linter,
 * Synthesis-vs-RTL, Timing Regression Detector, Physical Congestion, Power Estimation,
 * DRC/LVS Triage, Design-Space Exploration, Sign-off Readiness Matrix.
 */

class DesignSignoffEngine {
  constructor() {}

  // 31. PPA Optimization Advisor
  evaluatePpaTradeoff(currentAreaUm2, targetFmaxMhz, powerMilliwatts) {
    const areaEfficiency = (targetFmaxMhz / (currentAreaUm2 / 1000.0)).toFixed(2);
    const powerEfficiencyMhzPerMw = (targetFmaxMhz / powerMilliwatts).toFixed(2);
    return {
      area_um2: currentAreaUm2,
      fmax_mhz: targetFmaxMhz,
      power_mw: powerMilliwatts,
      metric_fmax_per_area: areaEfficiency,
      metric_fmax_per_mw: powerEfficiencyMhzPerMw,
      recommendation: targetFmaxMhz > 1000 ? 'Apply register retiming on critical ALU paths' : 'Apply VT cell swapping for leakage reduction'
    };
  }

  // 32. Critical Path Explainer
  explainCriticalPath(pathDetails) {
    const logicRatio = (pathDetails.logic_delay_ns / pathDetails.total_delay_ns) * 100.0;
    const netRatio = 100.0 - logicRatio;
    return {
      slack_ns: pathDetails.slack_ns,
      total_delay_ns: pathDetails.total_delay_ns,
      logic_delay_percentage: parseFloat(logicRatio.toFixed(1)),
      net_delay_percentage: parseFloat(netRatio.toFixed(1)),
      dominant_delay_factor: logicRatio > 65.0 ? 'LOGIC_LEVELS_TOO_DEEP' : 'WIRE_CONGESTION_OR_FANOUT',
      surgical_prescription: logicRatio > 65.0 ? 'Pipeline combinatorial cone by adding DFF stage' : 'Buffer insertion / driver cell up-sizing'
    };
  }

  // 33. Constraint Linter
  lintConstraints(sdcString) {
    const issues = [];
    if (!sdcString.includes('create_clock')) issues.push('MISSING_PRIMARY_CLOCK_DEFINITION');
    if (!sdcString.includes('set_clock_uncertainty')) issues.push('MISSING_CLOCK_UNCERTAINTY_BUDGET');
    if (!sdcString.includes('set_input_delay')) issues.push('UNCONSTRAINED_INPUT_PORTS');
    if (!sdcString.includes('set_output_delay')) issues.push('UNCONSTRAINED_OUTPUT_PORTS');

    return {
      total_lint_warnings: issues.length,
      warnings: issues,
      quality_score: Math.max(0, 100 - (issues.length * 25)),
      status: issues.length === 0 ? 'CLEAN_SDC' : 'REVISION_NEEDED'
    };
  }

  // 34. Synthesis-versus-RTL Comparison
  compareSynthesisToRtl(rtlRegCount, gateNetlistDffCount) {
    const diff = gateNetlistDffCount - rtlRegCount;
    return {
      rtl_registers: rtlRegCount,
      gate_dffs: gateNetlistDffCount,
      difference: diff,
      explanation: diff === 0 ? 'Exact 1:1 state retention match' : (diff < 0 ? 'Optimized unused/constant registers' : 'Added pipeline/retimed DFFs')
    };
  }

  // 35. Timing Regression Detector
  detectTimingRegression(baselineWnsNs, currentWnsNs) {
    const delta = currentWnsNs - baselineWnsNs;
    const isRegression = delta < -0.05; // 50ps regression threshold
    return {
      baseline_wns_ns: baselineWnsNs,
      current_wns_ns: currentWnsNs,
      delta_ns: parseFloat(delta.toFixed(3)),
      regression_detected: isRegression,
      severity: isRegression ? (delta < -0.2 ? 'BLOCKING_REGRESSION' : 'WARNING_REGRESSION') : 'IMPROVED_OR_STABLE'
    };
  }

  // 36. Physical Congestion Analyzer
  analyzeCongestion(gcellOverflowPct, maxRoutingLayers) {
    return {
      gcell_overflow_pct: gcellOverflowPct,
      routing_layers: maxRoutingLayers,
      routable: gcellOverflowPct < 1.5,
      congestion_status: gcellOverflowPct < 0.5 ? 'CLEAN' : (gcellOverflowPct < 1.5 ? 'MANAGEABLE' : 'UNROUTABLE_HOTSPOT')
    };
  }

  // 37. Power Estimation Assistant
  estimatePower(staticLeakageMw, dynamicSwitchingMwPerGhz, clockGhz) {
    const dynamicTotal = dynamicSwitchingMwPerGhz * clockGhz;
    const totalPower = staticLeakageMw + dynamicTotal;
    return {
      leakage_power_mw: staticLeakageMw,
      dynamic_power_mw: parseFloat(dynamicTotal.toFixed(2)),
      total_power_mw: parseFloat(totalPower.toFixed(2)),
      dynamic_ratio_pct: parseFloat(((dynamicTotal / totalPower) * 100).toFixed(1))
    };
  }

  // 38. DRC/LVS Failure Triage
  triagePhysicalVerification(drcViolationsCount, lvsDiscrepanciesCount) {
    return {
      drc_count: drcViolationsCount,
      lvs_count: lvsDiscrepanciesCount,
      tapeout_clearance: (drcViolationsCount === 0 && lvsDiscrepanciesCount === 0),
      priority_action: drcViolationsCount > 0 ? 'Fix short/spacing DRC before LVS net extraction' : (lvsDiscrepanciesCount > 0 ? 'Trace floating pin/power net shorts' : 'Physical Verification Sign-off Complete')
    };
  }

  // 39. Design-Space Exploration (DSE)
  exploreDesignSpace(optionsMatrix) {
    // Finds Pareto-optimal PPA points
    const ranked = optionsMatrix.map(opt => ({
      ...opt,
      ppa_score: (opt.fmax_mhz / (opt.area_kcells * 0.4 + opt.power_mw * 0.6)).toFixed(2)
    })).sort((a, b) => b.ppa_score - a.ppa_score);

    return {
      total_configurations_explored: optionsMatrix.length,
      pareto_optimal_config: ranked[0]
    };
  }

  // 40. Sign-off Readiness Matrix
  evaluateSignoffReadiness(criteriaList) {
    // Required: STA, DRC, LVS, Functional Coverage, Glitch Clean
    const unmet = criteriaList.filter(c => !c.passed);
    return {
      readiness_percentage: parseFloat((((criteriaList.length - unmet.length) / criteriaList.length) * 100).toFixed(1)),
      ready_for_mask_tapeout: unmet.length === 0,
      blocking_gates: unmet.map(u => u.name)
    };
  }
}

module.exports = { DesignSignoffEngine };
