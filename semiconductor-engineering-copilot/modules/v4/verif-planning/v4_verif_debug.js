/**
 * semiconductor-engineering-copilot V4.0
 * Group C: Verification Planning and Testbench Engineering (Features 21-30)
 * Group D: Simulation, Waveforms, and Debug (Features 31-40)
 */

class V4VerificationDebug {
  // --- GROUP C: Verification Planning & Testbench ---

  // 21. Verification Plan Coverage Mapper
  mapPlanCoverage(planFeatures, coveredFeatures) {
    if (!Array.isArray(planFeatures) || !Array.isArray(coveredFeatures)) return { status: 'ERROR', error: 'ARRAYS_REQUIRED' };
    const missing = planFeatures.filter(f => !coveredFeatures.includes(f));
    const pct = ((planFeatures.length - missing.length) / planFeatures.length) * 100.0;
    return {
      status: 'MAPPED',
      plan_coverage_pct: parseFloat(pct.toFixed(1)),
      missing_features: missing,
      closure_ready: missing.length === 0
    };
  }

  // 22. Test Scenario Combinator
  combineTestScenarios(dimensions) {
    if (!dimensions || typeof dimensions !== 'object') return { status: 'ERROR', error: 'DIMENSIONS_REQUIRED' };
    const keys = Object.keys(dimensions);
    let combos = [{}];
    for (const key of keys) {
      const vals = dimensions[key];
      const next = [];
      for (const c of combos) {
        for (const v of vals) {
          next.push({ ...c, [key]: v });
        }
      }
      combos = next;
    }
    return { status: 'COMBINED', total_scenarios: combos.length, scenarios: combos };
  }

  // 23. Boundary Scenario Generator
  generateBoundaryScenarios(busWidth) {
    if (!busWidth || busWidth <= 0) return { status: 'ERROR', error: 'INVALID_WIDTH' };
    const maxVal = Math.pow(2, busWidth) - 1;
    return {
      status: 'GENERATED',
      bus_width: busWidth,
      scenarios: [
        { name: 'ZERO', hex: '0x0' },
        { name: 'ONE', hex: '0x1' },
        { name: 'MAX_MINUS_ONE', hex: `0x${(maxVal - 1).toString(16)}` },
        { name: 'ALL_ONES_MAX', hex: `0x${maxVal.toString(16)}` }
      ]
    };
  }

  // 24. Temporal Sequence Test Generator
  generateTemporalSequence(sequenceType) {
    const seqs = {
      BACK_TO_BACK_BURST: ['CYCLE_1: VALID=1, READY=1', 'CYCLE_2: VALID=1, READY=1', 'CYCLE_3: VALID=1, READY=1'],
      INTERMITTENT_READY: ['CYCLE_1: VALID=1, READY=0', 'CYCLE_2: VALID=1, READY=0', 'CYCLE_3: VALID=1, READY=1']
    };
    return {
      status: 'GENERATED',
      sequence_type: sequenceType,
      sequence_steps: seqs[sequenceType] || seqs.BACK_TO_BACK_BURST
    };
  }

  // 25. Constrained-Random Configuration Advisor
  adviseRandomConstraints(coverageDistribution) {
    return {
      status: 'ADVISED',
      weight_overrides: {
        short_transfers: 10,
        normal_transfers: 30,
        corner_case_max_burst: 60
      },
      rationale: 'Elevate weight on corner_case_max_burst to accelerate unhit coverage bin closure.'
    };
  }

  // 26. Testbench Component Reuse Finder
  findReusableTbComponents(interfaceType, tbLibrary) {
    if (!Array.isArray(tbLibrary)) return { status: 'ERROR', error: 'LIBRARY_REQUIRED' };
    const matches = tbLibrary.filter(c => c.interface === interfaceType);
    return {
      status: 'FOUND',
      matched_components_count: matches.length,
      components: matches
    };
  }

  // 27. Scoreboard Consistency Checker
  checkScoreboardConsistency(txPushed, txPopped) {
    if (txPushed === undefined || txPopped === undefined) return { status: 'ERROR', error: 'COUNTS_REQUIRED' };
    const inFlight = txPushed - txPopped;
    const clean = inFlight >= 0;
    return {
      status: clean ? 'CONSISTENT' : 'SCOREBOARD_UNDERFLOW_ERROR',
      in_flight_transactions: inFlight,
      clean: clean && inFlight === 0
    };
  }

  // 28. Reference Model Cross-Checker
  crossCheckReferenceModel(dutResult, goldenModelResult) {
    const match = JSON.stringify(dutResult) === JSON.stringify(goldenModelResult);
    return {
      status: match ? 'MATCH_VERIFIED' : 'MISMATCH_DETECTED',
      matches: match,
      discrepancy: match ? null : { dut: dutResult, golden: goldenModelResult }
    };
  }

  // 29. Test Oracle Reliability Analyzer
  analyzeOracleReliability(testRunStats) {
    const falsePositives = testRunStats.false_positives || 0;
    const totalRuns = testRunStats.total_runs || 100;
    const reliabilityPct = ((totalRuns - falsePositives) / totalRuns) * 100.0;
    return {
      status: 'ANALYZED',
      reliability_pct: parseFloat(reliabilityPct.toFixed(2)),
      trust_tier: reliabilityPct >= 99.0 ? 'GOLDEN_TRUSTED' : 'REQUIRES_ORACLE_CALIBRATION'
    };
  }

  // 30. Verification Exit Criteria Manager
  evaluateVerificationExit(metrics) {
    if (!metrics) return { status: 'ERROR', error: 'METRICS_REQUIRED' };
    const unmet = [];
    if (metrics.code_coverage_pct < 100.0) unmet.push('CODE_COVERAGE_INCOMPLETE');
    if (metrics.functional_coverage_pct < 100.0) unmet.push('FUNCTIONAL_COVERAGE_INCOMPLETE');
    if (metrics.open_uvm_errors > 0) unmet.push('OPEN_UVM_ERRORS_EXIST');
    return {
      status: unmet.length === 0 ? 'EXIT_CRITERIA_SATISFIED' : 'CRITERIA_BLOCKED',
      ready_for_tapeout: unmet.length === 0,
      unmet_criteria: unmet
    };
  }

  // --- GROUP D: Simulation, Waveforms, and Debug ---

  // 31. Simulator Capability Profiler
  profileSimulatorCapabilities(simName) {
    const profiles = {
      iverilog: { sv_support: 'PARTIAL', uvm_support: false, speed_tier: 'MEDIUM', headless: true },
      vcs: { sv_support: 'FULL', uvm_support: true, speed_tier: 'ULTRA_FAST', headless: true },
      xrun: { sv_support: 'FULL', uvm_support: true, speed_tier: 'ULTRA_FAST', headless: true }
    };
    return {
      status: 'PROFILED',
      simulator: simName,
      capabilities: profiles[simName.toLowerCase()] || { sv_support: 'UNKNOWN', uvm_support: false }
    };
  }

  // 32. Simulation Configuration Validator
  validateSimulationConfig(config) {
    if (!config) return { status: 'ERROR', error: 'CONFIG_REQUIRED' };
    const missing = [];
    if (!config.top_module) missing.push('top_module');
    if (!config.source_files || config.source_files.length === 0) missing.push('source_files');
    return {
      status: missing.length === 0 ? 'CONFIG_VALID' : 'CONFIG_INVALID',
      missing_fields: missing,
      valid: missing.length === 0
    };
  }

  // 33. Compile Error Taxonomy Engine
  classifyCompileError(errorStderr) {
    if (!errorStderr) return { status: 'ERROR', error: 'STDERR_REQUIRED' };
    let taxonomy = 'SYNTAX_ERROR';
    if (errorStderr.includes('not declared') || errorStderr.includes('unknown identifier')) {
      taxonomy = 'UNDECLARED_IDENTIFIER';
    } else if (errorStderr.includes('port connection mismatch') || errorStderr.includes('width mismatch')) {
      taxonomy = 'PORT_BINDING_MISMATCH';
    } else if (errorStderr.includes('License checkout failed')) {
      taxonomy = 'LICENSE_CHECKOUT_FAILURE';
    }
    return { status: 'CLASSIFIED', taxonomy, raw_error: errorStderr.split('\n')[0] };
  }

  // 34. Simulation Exit-Code Classifier
  classifyExitCode(exitCode) {
    const map = {
      0: { category: 'SUCCESS', description: 'Clean normal simulation termination' },
      1: { category: 'TEST_ASSERTION_FAILURE', description: 'UVM_ERROR or SVA failure detected' },
      124: { category: 'TIMEOUT_EXCEEDED', description: 'Killed by simulation timeout watchdog' },
      139: { category: 'SEGMENTATION_FAULT', description: 'Memory corruption in simulator binary/C-DPI' }
    };
    return {
      exit_code: exitCode,
      classification: map[exitCode] || { category: 'UNKNOWN_FAILURE', description: 'Abnormal process termination' }
    };
  }

  // 35. Waveform Signal Navigator
  navigateWaveform(signalEvents, targetValue) {
    if (!Array.isArray(signalEvents)) return { status: 'ERROR', error: 'EVENTS_ARRAY_REQUIRED' };
    const transitions = signalEvents.filter(e => e.val === targetValue);
    return {
      status: 'NAVIGATED',
      total_matches: transitions.length,
      transition_timestamps: transitions.map(t => t.time)
    };
  }

  // 36. Event Timeline Correlator
  correlateTimelineEvents(eventListA, eventListB) {
    if (!Array.isArray(eventListA) || !Array.isArray(eventListB)) return { status: 'ERROR', error: 'ARRAYS_REQUIRED' };
    const correlations = [];
    for (const a of eventListA) {
      const match = eventListB.find(b => Math.abs(b.time - a.time) <= 10); // within 10ns
      if (match) correlations.push({ event_a: a.name, event_b: match.name, delta_time: Math.abs(match.time - a.time) });
    }
    return { status: 'CORRELATED', correlated_pairs_count: correlations.length, pairs: correlations };
  }

  // 37. Signal Invariant Checker
  checkSignalInvariant(signalSamples, invariantConditionFn) {
    if (!Array.isArray(signalSamples) || typeof invariantConditionFn !== 'function') return { status: 'ERROR', error: 'PARAMS_REQUIRED' };
    const violations = [];
    for (const s of signalSamples) {
      if (!invariantConditionFn(s)) violations.push(s);
    }
    return {
      status: violations.length === 0 ? 'INVARIANT_HOLDS' : 'INVARIANT_VIOLATED',
      violations_count: violations.length,
      clean: violations.length === 0
    };
  }

  // 38. Race Condition Heuristic Detector
  detectRaceCondition(concurrentAssignments) {
    if (!Array.isArray(concurrentAssignments)) return { status: 'ERROR', error: 'ARRAY_REQUIRED' };
    // Check multiple assignments to the same net in parallel blocks
    const seen = new Set();
    const races = [];
    for (const a of concurrentAssignments) {
      if (seen.has(a.target_net)) races.push(a.target_net);
      seen.add(a.target_net);
    }
    return {
      status: races.length === 0 ? 'RACE_FREE' : 'RACE_CONDITION_DETECTED',
      racing_nets: races
    };
  }

  // 39. Simulation Hang Watchdog
  checkHangWatchdog(lastActivityTimeNs, currentTimeNs, thresholdNs = 10000) {
    const elapsed = currentTimeNs - lastActivityTimeNs;
    const isHanging = elapsed >= thresholdNs;
    return {
      status: isHanging ? 'SIMULATION_HANG_ALERT' : 'ACTIVE_PROGRESS',
      elapsed_inactivity_ns: elapsed,
      threshold_ns: thresholdNs,
      is_hanging: isHanging
    };
  }

  // 40. Debug Evidence Packager
  packageDebugEvidence(simLog, vcdPath, seed, failureLine) {
    return {
      status: 'PACKAGED',
      bundle_id: `DBG_${Date.now()}`,
      reproduce_seed: seed || 1,
      failure_line: failureLine || 'unknown',
      vcd_trace_path: vcdPath || null,
      evidence_valid: Boolean(simLog)
    };
  }
}

module.exports = { V4VerificationDebug };
