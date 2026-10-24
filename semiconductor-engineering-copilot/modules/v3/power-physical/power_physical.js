/**
 * semiconductor-engineering-copilot V3.0
 * Module D: Power, DFT, Physical and Manufacturing Intelligence (Capabilities 31-40)
 */

class PowerPhysicalModule {
  // 31. Power Intent Reviewer (UPF/CPF)
  reviewPowerIntent(upfContentString) {
    if (!upfContentString || typeof upfContentString !== 'string') return { status: 'ERROR', error: 'UPF_STRING_REQUIRED' };
    const domains = [];
    const domainMatches = upfContentString.match(/create_power_domain\s+([a-zA-Z0-9_]+)/g) || [];
    for (const d of domainMatches) {
      domains.push(d.split(/\s+/)[1]);
    }
    const hasIso = upfContentString.includes('set_isolation');
    const hasLsh = upfContentString.includes('set_level_shifter');
    return {
      status: 'REVIEWED',
      power_domains_detected: domains,
      has_isolation_rules: hasIso,
      has_level_shifters: hasLsh,
      compliant: domains.length <= 1 || (hasIso && hasLsh)
    };
  }

  // 32. Low-Power Verification Planner
  planLowPowerVerification(powerDomainsList) {
    if (!Array.isArray(powerDomainsList)) return { status: 'ERROR', error: 'DOMAINS_LIST_REQUIRED' };
    const scenarios = [];
    for (const d of powerDomainsList) {
      scenarios.push({ domain: d, state: 'OFF', expected_isolation_active: true });
      scenarios.push({ domain: d, state: 'ON', expected_isolation_active: false });
    }
    return {
      status: 'PLAN_GENERATED',
      total_power_scenarios: scenarios.length,
      scenarios: scenarios
    };
  }

  // 33. IR-Drop Report Assistant
  parseIrDropReport(irDropReportText, maxAllowedVdropMv = 50.0) {
    if (!irDropReportText) return { status: 'ERROR', error: 'REPORT_TEXT_REQUIRED' };
    const vdropMatch = irDropReportText.match(/(?:Worst|Max|Peak)\s+(?:IR\s*Drop|Vdrop)\s*[:=]\s*([0-9.]+)\s*mV/i);
    const worstDrop = vdropMatch ? parseFloat(vdropMatch[1]) : 0.0;
    const clean = worstDrop <= maxAllowedVdropMv;
    return {
      status: clean ? 'IR_DROP_MET' : 'IR_DROP_VIOLATED',
      worst_vdrop_mv: worstDrop,
      allowed_limit_mv: maxAllowedVdropMv,
      compliant: clean
    };
  }

  // 34. Electromigration Report Analyzer
  parseEmReport(emReportText) {
    if (!emReportText) return { status: 'ERROR', error: 'REPORT_TEXT_REQUIRED' };
    const emViolations = (emReportText.match(/EM\s+VIOLATION/gi) || []).length;
    return {
      status: emViolations === 0 ? 'EM_CLEAN' : 'EM_VIOLATIONS_FOUND',
      total_em_violations: emViolations,
      compliant: emViolations === 0
    };
  }

  // 35. Clock Tree Quality Reviewer
  reviewClockTree(skewNs, maxLatencyNs, maxTransitionNs) {
    if (skewNs === undefined || maxLatencyNs === undefined) return { status: 'ERROR', error: 'METRICS_REQUIRED' };
    const cleanSkew = skewNs <= 0.150; // 150ps target
    const cleanLatency = maxLatencyNs <= 1.5; // 1.5ns target
    return {
      status: (cleanSkew && cleanLatency) ? 'CTS_QUALITY_EXCELLENT' : 'CTS_QUALITY_MARGINAL',
      clock_skew_ns: skewNs,
      max_latency_ns: maxLatencyNs,
      skew_target_met: cleanSkew,
      latency_target_met: cleanLatency
    };
  }

  // 36. Parasitic Extraction Consistency Checker
  checkParasiticConsistency(spefReportText) {
    if (!spefReportText) return { status: 'ERROR', error: 'SPEF_TEXT_REQUIRED' };
    const hasNegativeCaps = spefReportText.includes('NEGATIVE_CAP') || /-[0-9.]+e-[0-9]+\s*F/.test(spefReportText);
    const totalNetsMatch = spefReportText.match(/D_NET\s+(\d+)/i);
    return {
      status: hasNegativeCaps ? 'PARASITIC_ANOMALY_DETECTED' : 'SPEF_CONSISTENT',
      has_negative_capacitance: hasNegativeCaps,
      extracted_net_count: totalNetsMatch ? parseInt(totalNetsMatch[1], 10) : 100
    };
  }

  // 37. Scan Architecture Reviewer
  reviewScanArchitecture(scanChainsCount, maxChainLengthDff) {
    if (!scanChainsCount || !maxChainLengthDff) return { status: 'ERROR', error: 'PARAMETERS_REQUIRED' };
    const balanced = maxChainLengthDff <= 1000;
    return {
      status: balanced ? 'SCAN_ARCHITECTURE_BALANCED' : 'CHAIN_LENGTH_EXCESSIVE',
      scan_chains: scanChainsCount,
      max_depth_dff: maxChainLengthDff,
      test_time_cost_tier: balanced ? 'OPTIMAL' : 'HIGH_TEST_TIME'
    };
  }

  // 38. ATPG Result Analyzer
  parseAtpgReport(atpgReportText, targetCoveragePct = 98.0) {
    if (!atpgReportText) return { status: 'ERROR', error: 'REPORT_TEXT_REQUIRED' };
    const covMatch = atpgReportText.match(/(?:Fault\s*Coverage|Test\s*Coverage)\s*[:=]\s*([0-9.]+)\s*%/i);
    const measuredCov = covMatch ? parseFloat(covMatch[1]) : 0.0;
    const passed = measuredCov >= targetCoveragePct;
    return {
      status: passed ? 'ATPG_TARGET_MET' : 'ATPG_TARGET_MISSED',
      measured_fault_coverage_pct: measuredCov,
      target_threshold_pct: targetCoveragePct,
      compliant: passed
    };
  }

  // 39. Silicon Bring-up Planner
  planSiliconBringup(voltageCornersList, freqStepsMhz) {
    if (!Array.isArray(voltageCornersList) || !Array.isArray(freqStepsMhz)) return { status: 'ERROR', error: 'ARRAYS_REQUIRED' };
    const testPoints = [];
    for (const v of voltageCornersList) {
      for (const f of freqStepsMhz) {
        testPoints.push({ voltage_v: v, fmax_mhz: f, shmoo_cell_id: `SHMOO_${v}V_${f}MHz` });
      }
    }
    return {
      status: 'BRINGUP_PLAN_GENERATED',
      total_shmoo_points: testPoints.length,
      shmoo_matrix: testPoints
    };
  }

  // 40. Yield Data Analysis Assistant
  analyzeYieldLot(totalDiesTested, passingDies) {
    if (totalDiesTested <= 0 || passingDies < 0 || passingDies > totalDiesTested) {
      return { status: 'ERROR', error: 'INVALID_DIE_COUNTS' };
    }
    const yieldPct = (passingDies / totalDiesTested) * 100.0;
    return {
      status: 'YIELD_ANALYZED',
      total_dies: totalDiesTested,
      passing_dies: passingDies,
      yield_percentage: parseFloat(yieldPct.toFixed(2)),
      yield_grade: yieldPct >= 90.0 ? 'EXCELLENT' : (yieldPct >= 75.0 ? 'COMMERCIAL_ACCEPTABLE' : 'FABRICATION_ALERT')
    };
  }
}

module.exports = { PowerPhysicalModule };
