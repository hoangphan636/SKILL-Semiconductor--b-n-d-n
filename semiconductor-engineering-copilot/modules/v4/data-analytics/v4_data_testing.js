/**
 * SEMICONDUCTOR ENGINEERING COPILOT V4.0
 * Group I: Data, Reporting, and Analytics (81-90)
 * Group J: Testing, Reliability, and Release (91-100)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// -------------------------------------------------------------
// Group I: Data, Reporting, and Analytics
// -------------------------------------------------------------

/** 81. Dataset Validator */
function validateDataset(dataset, schema = {}) {
  if (!Array.isArray(dataset)) {
    return { valid: false, error: 'Dataset must be an array of records' };
  }
  const requiredFields = schema.required || [];
  const errors = [];

  dataset.forEach((record, idx) => {
    requiredFields.forEach(f => {
      if (record[f] === undefined || record[f] === null) {
        errors.push({ index: idx, field: f, message: 'Missing required field' });
      }
    });
  });

  return {
    valid: errors.length === 0,
    recordCount: dataset.length,
    errorCount: errors.length,
    errors
  };
}

/** 82. Report Semantic Normalizer */
function normalizeEdaReport(rawReport, toolType) {
  // Normalizes reports across Synopsys/Cadence/Yosys into canonical schema
  const normalized = {
    canonicalVersion: '1.0',
    toolType,
    wns: null,
    tns: null,
    totalArea: null,
    cellCount: null,
    violations: []
  };

  if (toolType === 'timing') {
    const wnsMatch = rawReport.match(/slack\s*\(VIOLATED\):\s*([-\d\.]+)/i) || rawReport.match(/wns:\s*([-\d\.]+)/i);
    const tnsMatch = rawReport.match(/tns:\s*([-\d\.]+)/i);
    if (wnsMatch) normalized.wns = parseFloat(wnsMatch[1]);
    if (tnsMatch) normalized.tns = parseFloat(tnsMatch[1]);
  } else if (toolType === 'synthesis') {
    const areaMatch = rawReport.match(/total\s+cell\s+area:\s*([\d\.]+)/i) || rawReport.match(/area:\s*([\d\.]+)/i);
    const cellMatch = rawReport.match(/number\s+of\s+cells:\s*(\d+)/i) || rawReport.match(/cells:\s*(\d+)/i);
    if (areaMatch) normalized.totalArea = parseFloat(areaMatch[1]);
    if (cellMatch) normalized.cellCount = parseInt(cellMatch[1], 10);
  }

  return normalized;
}

/** 83. Historical Trend Store */
function recordTrendPoint(store, metricName, value, buildId) {
  if (!store[metricName]) {
    store[metricName] = [];
  }
  const entry = {
    timestamp: new Date().toISOString(),
    buildId,
    value: typeof value === 'number' ? value : parseFloat(value)
  };
  store[metricName].push(entry);

  // Compute delta from previous
  const prev = store[metricName].length > 1 ? store[metricName][store[metricName].length - 2].value : null;
  const delta = prev !== null ? entry.value - prev : 0;

  return {
    metricName,
    current: entry.value,
    previous: prev,
    delta,
    totalEntries: store[metricName].length
  };
}

/** 84. KPI Registry */
function evaluateKpis(kpiDefinitions, actuals) {
  const results = [];
  let allPassed = true;

  for (const [kpi, def] of Object.entries(kpiDefinitions)) {
    const val = actuals[kpi];
    let passed = false;
    if (def.condition === '>=') passed = val >= def.target;
    else if (def.condition === '<=') passed = val <= def.target;
    else if (def.condition === '==') passed = val === def.target;

    if (!passed) allPassed = false;
    results.push({
      kpi,
      actual: val,
      target: def.target,
      condition: def.condition,
      passed
    });
  }

  return {
    allKpisMet: allPassed,
    results
  };
}

/** 85. Outlier Explanation Assistant */
function detectAndExplainOutliers(series, zScoreThreshold = 2.0) {
  if (series.length < 3) {
    return { outliers: [], explanation: 'Insufficient data points for outlier detection' };
  }

  const mean = series.reduce((a, b) => a + b, 0) / series.length;
  const variance = series.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / series.length;
  const stdDev = Math.sqrt(variance);

  const outliers = [];
  series.forEach((val, idx) => {
    if (stdDev > 0) {
      const z = Math.abs((val - mean) / stdDev);
      if (z >= zScoreThreshold) {
        outliers.push({ index: idx, value: val, zScore: Number(z.toFixed(2)), deviation: val - mean });
      }
    }
  });

  return {
    mean: Number(mean.toFixed(2)),
    stdDev: Number(stdDev.toFixed(2)),
    outliers,
    hasOutliers: outliers.length > 0,
    explanation: outliers.length > 0 ? `Detected ${outliers.length} anomalous data points exceeding ${zScoreThreshold} standard deviations.` : 'All data points within normal distribution bounds.'
  };
}

/** 86. Citation Engine */
function generateEvidenceCitation(sourceFile, lineStart, lineEnd, claim) {
  return {
    citationId: `cite_${crypto.randomBytes(4).toString('hex')}`,
    claim,
    source: `${sourceFile}#L${lineStart}-L${lineEnd}`,
    verified: true,
    timestamp: new Date().toISOString()
  };
}

/** 87. Freshness Checker */
function checkArtifactFreshness(artifactTimestamp, maxAgeMinutes = 60) {
  const ageMs = Date.now() - new Date(artifactTimestamp).getTime();
  const ageMinutes = ageMs / (1000 * 60);
  const isFresh = ageMinutes <= maxAgeMinutes;

  return {
    artifactTimestamp,
    ageMinutes: Math.round(ageMinutes),
    maxAgeMinutes,
    isFresh,
    action: isFresh ? 'USE_EXISTING' : 'TRIGGER_REGENERATION'
  };
}

/** 88. Decision Search Engine */
function searchDecisions(decisionRecords, query) {
  const terms = query.toLowerCase().split(/\s+/);
  const matches = decisionRecords.filter(rec => {
    const text = `${rec.title || ''} ${rec.context || ''} ${rec.decision || ''}`.toLowerCase();
    return terms.every(t => text.includes(t));
  });

  return {
    query,
    count: matches.length,
    matches
  };
}

/** 89. Cross-Project Pattern Miner */
function mineCommonPatterns(projectRuns) {
  const failureFrequency = {};
  projectRuns.forEach(run => {
    (run.failures || []).forEach(f => {
      failureFrequency[f] = (failureFrequency[f] || 0) + 1;
    });
  });

  const sortedPatterns = Object.entries(failureFrequency)
    .sort((a, b) => b[1] - a[1])
    .map(([issue, freq]) => ({ issue, frequency: freq, commonalityScore: freq / projectRuns.length }));

  return {
    totalProjectsAnalyzed: projectRuns.length,
    patterns: sortedPatterns
  };
}

/** 90. Data Lineage Graph Builder */
function buildDataLineage(stages) {
  const nodes = [];
  const edges = [];

  stages.forEach(st => {
    nodes.push({ id: st.name, type: st.type });
    (st.inputs || []).forEach(inp => {
      edges.push({ from: inp, to: st.name });
    });
  });

  return {
    nodes,
    edges,
    lineageValid: nodes.length > 0
  };
}

// -------------------------------------------------------------
// Group J: Testing, Reliability, and Release
// -------------------------------------------------------------

/** 91. Test Impact Prioritizer */
function prioritizeTestsByChange(changedFiles, testSuiteMap) {
  // testSuiteMap: { [testName]: ['fileA.v', 'fileB.v'] }
  const highPriority = [];
  const normalPriority = [];

  for (const [testName, coveredFiles] of Object.entries(testSuiteMap)) {
    const matches = coveredFiles.filter(f => changedFiles.includes(f));
    if (matches.length > 0) {
      highPriority.push({ testName, matchedFiles: matches });
    } else {
      normalPriority.push(testName);
    }
  }

  return {
    totalTests: Object.keys(testSuiteMap).length,
    highPriority,
    normalPriority,
    recommendedOrder: [...highPriority.map(h => h.testName), ...normalPriority]
  };
}

/** 92. Smoke Profile Manager */
function getSmokeTestProfile(profileName = 'quick') {
  const profiles = {
    'quick': { timeoutSeconds: 30, testCategories: ['structure', 'config', 'lint', 'basic_sim'], maxWorkers: 2 },
    'standard': { timeoutSeconds: 120, testCategories: ['all_smoke', 'fast_unit'], maxWorkers: 4 },
    'deep': { timeoutSeconds: 600, testCategories: ['smoke', 'unit', 'regression', 'sec'], maxWorkers: 8 }
  };

  return profiles[profileName] || profiles['quick'];
}

/** 93. Unit-to-Smoke Traceability */
function traceUnitToSmoke(unitTests, smokeTests) {
  const coverageMap = {};
  smokeTests.forEach(st => {
    coverageMap[st.name] = unitTests.filter(ut => ut.category === st.category).map(u => u.name);
  });

  return {
    smokeTestCount: smokeTests.length,
    unitCoverageMap: coverageMap
  };
}

/** 94. Critical Workflow Sentinel */
function evaluateSentinelHealth(criticalServices) {
  const checks = [];
  let healthy = true;

  criticalServices.forEach(s => {
    const isUp = s.status === 'UP' && s.latencyMs < 1000;
    if (!isUp) healthy = false;
    checks.push({ name: s.name, healthy: isUp, latencyMs: s.latencyMs, status: s.status });
  });

  return {
    allHealthy: healthy,
    timestamp: new Date().toISOString(),
    checks
  };
}

/** 95. RC (Release Candidate) Validator */
function validateReleaseCandidate(rcData) {
  const failures = [];
  if (!rcData.version || !rcData.version.includes('-rc')) {
    failures.push('Version string must designate a release candidate (e.g., v4.0.0-rc1)');
  }
  if (!rcData.testsPassed || rcData.testsPassed < rcData.totalTests) {
    failures.push('All release candidate tests must be 100% passing');
  }
  if (rcData.securityVulnerabilities && rcData.securityVulnerabilities > 0) {
    failures.push('Zero security vulnerabilities permitted in release candidate');
  }

  return {
    valid: failures.length === 0,
    version: rcData.version,
    failures
  };
}

/** 96. Rollback Verifier */
function verifyRollbackState(currentDeployment, previousSnapshot) {
  const matchingHash = currentDeployment.configHash === previousSnapshot.configHash;
  const artifactMatch = currentDeployment.artifactDigest === previousSnapshot.artifactDigest;

  return {
    rollbackSuccessful: matchingHash && artifactMatch,
    currentVersion: currentDeployment.version,
    targetSnapshotVersion: previousSnapshot.version,
    matchDetails: { matchingHash, artifactMatch }
  };
}

/** 97. Flaky Test Quarantine Manager */
function evaluateFlakiness(testHistory, thresholdRate = 0.2) {
  // testHistory: { testName: [pass, fail, pass, pass, ...] }
  const quarantined = [];
  const stable = [];

  for (const [testName, runs] of Object.entries(testHistory)) {
    const fails = runs.filter(r => !r).length;
    const failRate = fails / runs.length;
    if (failRate > thresholdRate && failRate < 1.0) {
      quarantined.push({ testName, runs: runs.length, failRate: Number(failRate.toFixed(2)) });
    } else {
      stable.push({ testName, failRate: Number(failRate.toFixed(2)) });
    }
  }

  return {
    thresholdRate,
    quarantinedCount: quarantined.length,
    quarantined,
    stable
  };
}

/** 98. Test Duration Regression Detector */
function detectDurationRegression(baselineDurations, currentDurations, thresholdPercent = 25) {
  const regressions = [];

  for (const [testName, currentMs] of Object.entries(currentDurations)) {
    const baseMs = baselineDurations[testName];
    if (baseMs) {
      const increase = ((currentMs - baseMs) / baseMs) * 100;
      if (increase >= thresholdPercent) {
        regressions.push({
          testName,
          baselineMs: baseMs,
          currentMs,
          increasePercent: Number(increase.toFixed(1))
        });
      }
    }
  }

  return {
    hasRegressions: regressions.length > 0,
    regressionCount: regressions.length,
    regressions
  };
}

/** 99. Quality Gate Evidence Bundle Builder */
function buildEvidenceBundle(testResults, coverageReport, secReport) {
  const bundle = {
    bundleId: `bundle_${Date.now()}`,
    timestamp: new Date().toISOString(),
    metrics: {
      testsTotal: testResults.total,
      testsPassed: testResults.passed,
      passRate: ((testResults.passed / testResults.total) * 100).toFixed(1) + '%',
      lineCoverage: coverageReport.lineCoverage + '%',
      vulnerabilities: secReport.vulnerabilitiesCount
    },
    gateDecision: testResults.passed === testResults.total && secReport.vulnerabilitiesCount === 0 ? 'GO' : 'NO_GO'
  };

  bundle.checksum = crypto.createHash('sha256').update(JSON.stringify(bundle.metrics)).digest('hex');
  return bundle;
}

/** 100. Post-Release Health Validator */
function validatePostReleaseHealth(metrics) {
  const healthy = metrics.errorRate < 0.01 && metrics.avgLatencyMs < 200 && metrics.crashCount === 0;

  return {
    healthy,
    metrics,
    status: healthy ? 'HEALTHY_RELEASE' : 'DEGRADATION_DETECTED'
  };
}

module.exports = {
  // Group I
  validateDataset,
  normalizeEdaReport,
  recordTrendPoint,
  evaluateKpis,
  detectAndExplainOutliers,
  generateEvidenceCitation,
  checkArtifactFreshness,
  searchDecisions,
  mineCommonPatterns,
  buildDataLineage,
  // Group J
  prioritizeTestsByChange,
  getSmokeTestProfile,
  traceUnitToSmoke,
  evaluateSentinelHealth,
  validateReleaseCandidate,
  verifyRollbackState,
  evaluateFlakiness,
  detectDurationRegression,
  buildEvidenceBundle,
  validatePostReleaseHealth
};
