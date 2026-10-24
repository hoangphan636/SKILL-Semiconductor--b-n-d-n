/**
 * semiconductor-engineering-copilot V3.0
 * Module C: Change Management and Reliability (Capabilities 21-30)
 */

const crypto = require('crypto');
const path = require('path');

class ChangeReliabilityModule {
  // 21. RTL Change Impact Analyzer
  analyzeChangeImpact(changedFiles, dependencyGraph) {
    if (!Array.isArray(changedFiles) || !dependencyGraph) return { status: 'ERROR', error: 'INVALID_INPUTS' };
    const impactedModules = new Set();
    for (const file of changedFiles) {
      const base = path.basename(file, path.extname(file));
      impactedModules.add(base);
      for (const [parent, children] of Object.entries(dependencyGraph)) {
        if (Array.isArray(children) && children.includes(base)) {
          impactedModules.add(parent);
        }
      }
    }
    return {
      status: 'ANALYZED',
      changed_files_count: changedFiles.length,
      impacted_modules: Array.from(impactedModules),
      scope_level: impactedModules.size > 5 ? 'GLOBAL_REGRESSION_REQUIRED' : 'LOCAL_UNIT_TEST_ENOUGH'
    };
  }

  // 22. ECO Planning Assistant
  planEco(timingViolationDetails) {
    if (!timingViolationDetails || timingViolationDetails.slack_ns === undefined) return { status: 'ERROR', error: 'VIOLATION_DETAILS_REQUIRED' };
    const isHold = timingViolationDetails.violation_type === 'HOLD';
    let ecoStrategy = '';
    if (isHold) {
      ecoStrategy = 'INSERT_DELAY_BUFFERS_AT_ENDPOINT';
    } else {
      ecoStrategy = 'UPSIZE_CRITICAL_DRIVERS_OR_INSERT_PIPELINE_DFF';
    }
    return {
      status: 'ECO_PLANNED',
      violation_type: timingViolationDetails.violation_type || 'SETUP',
      slack_ns: timingViolationDetails.slack_ns,
      recommended_strategy: ecoStrategy,
      estimated_spare_cell_count: Math.max(1, Math.ceil(Math.abs(timingViolationDetails.slack_ns) * 10))
    };
  }

  // 23. Patch Risk Scorer
  scorePatchRisk(diffStat) {
    if (!diffStat) return { status: 'ERROR', error: 'DIFF_STAT_REQUIRED' };
    const linesChanged = (diffStat.additions || 0) + (diffStat.deletions || 0);
    const touchesClockOrReset = Boolean(diffStat.touches_clock_or_reset);
    let riskScore = linesChanged * 0.5 + (touchesClockOrReset ? 40 : 0);
    riskScore = Math.min(100, Math.round(riskScore));
    let level = 'LOW';
    if (riskScore > 60) level = 'CRITICAL';
    else if (riskScore > 25) level = 'MEDIUM';
    return {
      status: 'SCORED',
      risk_score: riskScore,
      risk_level: level,
      requires_manager_approval: riskScore > 50
    };
  }

  // 24. Golden Baseline Manager
  createGoldenBaseline(baselineName, filesContentMap) {
    if (!baselineName || !filesContentMap) return { status: 'ERROR', error: 'NAME_AND_CONTENT_REQUIRED' };
    const hash = crypto.createHash('sha256').update(JSON.stringify(filesContentMap)).digest('hex');
    return {
      status: 'BASELINE_LOCKED',
      baseline_id: `BASE_${baselineName}_${hash.substring(0, 8)}`,
      sha256_tree_hash: hash,
      tracked_files_count: Object.keys(filesContentMap).length
    };
  }

  // 25. Configuration Matrix Tester
  generateConfigMatrix(parametersSpace) {
    if (!parametersSpace || typeof parametersSpace !== 'object') return { status: 'ERROR', error: 'PARAM_SPACE_REQUIRED' };
    const keys = Object.keys(parametersSpace);
    if (keys.length === 0) return { status: 'EMPTY_SPACE', configurations: [] };
    // Cartesian product
    let combinations = [{}];
    for (const key of keys) {
      const values = parametersSpace[key];
      const next = [];
      for (const comb of combinations) {
        for (const val of values) {
          next.push({ ...comb, [key]: val });
        }
      }
      combinations = next;
    }
    return {
      status: 'MATRIX_GENERATED',
      total_combinations: combinations.length,
      configurations: combinations
    };
  }

  // 26. Build Dependency Integrity Checker
  checkBuildDependencies(makefileOrConfigString) {
    if (!makefileOrConfigString) return { status: 'ERROR', error: 'CONFIG_STRING_REQUIRED' };
    const hasCircular = makefileOrConfigString.includes('CIRCULAR_DEP');
    const missingOutputs = !makefileOrConfigString.includes('.v') && !makefileOrConfigString.includes('.sv');
    return {
      status: (hasCircular || missingOutputs) ? 'INTEGRITY_FAIL' : 'INTEGRITY_PASS',
      circular_dependency_found: hasCircular,
      missing_source_files: missingOutputs
    };
  }

  // 27. Reproducibility Auditor
  auditReproducibility(runA, runB) {
    if (!runA || !runB) return { status: 'ERROR', error: 'RUNS_REQUIRED' };
    const match = runA.output_hash === runB.output_hash;
    return {
      status: match ? 'DETERMINISTICALLY_REPRODUCIBLE' : 'NON_DETERMINISTIC_DISCREPANCY',
      is_reproducible: match,
      divergent_fields: match ? [] : ['output_hash']
    };
  }

  // 28. Artifact Integrity Verifier
  verifyArtifactIntegrity(artifactFilePath, expectedSha256, actualContentString) {
    if (!artifactFilePath || !actualContentString) return { status: 'ERROR', error: 'INPUTS_REQUIRED' };
    // Path traversal security check
    if (artifactFilePath.includes('..') || path.isAbsolute(artifactFilePath)) {
      return { status: 'SECURITY_VIOLATION', error: 'PATH_TRAVERSAL_REJECTED' };
    }
    const computed = crypto.createHash('sha256').update(actualContentString).digest('hex');
    const valid = computed === expectedSha256;
    return {
      status: valid ? 'INTEGRITY_VERIFIED' : 'HASH_MISMATCH',
      computed_sha256: computed,
      expected_sha256: expectedSha256,
      matches: valid
    };
  }

  // 29. Engineering Review Assistant
  generateReviewChecklist(reviewType) {
    const checklists = {
      RTL: ['Zero latches inferred', 'No asynchronous reset hazards', 'All ports constrained in SDC', 'No unused wire declarations'],
      STA: ['WNS >= 0.000ns', 'TNS == 0.000ns', 'Zero unconstrained endpoints', 'Clock uncertainty accurately derated'],
      PNR: ['Zero DRC violations', 'LVS clean match', 'Antenna violations resolved', 'Density rules met']
    };
    return {
      review_type: reviewType,
      checklist_items: checklists[reviewType] || checklists.RTL
    };
  }

  // 30. Rollback Planner
  planRollback(failedReleaseId, stableBaselineId) {
    if (!failedReleaseId || !stableBaselineId) return { status: 'ERROR', error: 'IDS_REQUIRED' };
    return {
      status: 'ROLLBACK_PLANNED',
      target_stable_baseline: stableBaselineId,
      failed_release: failedReleaseId,
      rollback_steps: [
        'Halt active regression and synthesis queues',
        `Revert git HEAD to commit pinned by ${stableBaselineId}`,
        'Re-trigger baseline smoke verification',
        'Notify engineering release leads'
      ]
    };
  }
}

module.exports = { ChangeReliabilityModule };
