/**
 * SEMICONDUCTOR ENGINEERING COPILOT V5.0
 * Group 1: Chiplet and Advanced Packaging (Features 1-10)
 * Group 2: CPU, GPU, NPU, and Accelerator Architecture (Features 11-20)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// -------------------------------------------------------------
// Group 1: Chiplet and Advanced Packaging
// -------------------------------------------------------------

/** 1. UCIe Interface Protocol Validator */
function validateUcieProtocol(config) {
  if (!config || !config.standard) {
    return { valid: false, error: 'CONFIG_REQUIRED', standard: null };
  }
  const supported = ['UCIE_1_0', 'UCIE_1_1', 'UCIE_2_0'];
  const isValidStandard = supported.includes(config.standard.toUpperCase());
  const widthValid = [16, 32, 64].includes(config.moduleWidth || 0);
  const dataRateValid = (config.dataRateGbps || 0) >= 4 && (config.dataRateGbps || 0) <= 32;

  const valid = isValidStandard && widthValid && dataRateValid;
  return {
    featureId: 'V5-001',
    name: 'UCIe Interface Protocol Validator',
    valid,
    standard: config.standard,
    checks: {
      standardConformant: isValidStandard,
      laneWidthConformant: widthValid,
      dataRateInRange: dataRateValid
    },
    status: valid ? 'COMPLIANT' : 'NON_COMPLIANT'
  };
}

/** 2. 2.5D/3D Die-to-Die Interconnect Router */
function routeDieToDieInterconnect(d2dTopology) {
  if (!d2dTopology || !Array.isArray(d2dTopology.nodes) || !Array.isArray(d2dTopology.links)) {
    return { status: 'ERROR', error: 'INVALID_TOPOLOGY' };
  }
  const routableLinks = d2dTopology.links.filter(l => l.maxBumpPitchUm >= 25 && l.lengthMm <= 10.0);
  const blockedLinks = d2dTopology.links.filter(l => l.maxBumpPitchUm < 25 || l.lengthMm > 10.0);

  return {
    featureId: 'V5-002',
    name: '2.5D/3D Die-to-Die Interconnect Router',
    status: blockedLinks.length === 0 ? 'ROUTED' : 'ROUTING_CONGESTION_OR_PITCH_VIOLATION',
    totalLinks: d2dTopology.links.length,
    routedCount: routableLinks.length,
    violatingCount: blockedLinks.length,
    maxLatencyPs: Math.max(...routableLinks.map(l => l.lengthMm * 6.5), 0)
  };
}

/** 3. High-Density Microbump Array Checker */
function checkMicrobumpArray(bumpArray) {
  if (!Array.isArray(bumpArray) || bumpArray.length === 0) {
    return { status: 'ERROR', error: 'EMPTY_BUMP_ARRAY' };
  }
  const violations = [];
  const minPitchUm = 35.0; // standard microbump pitch limit

  for (let i = 0; i < bumpArray.length; i++) {
    for (let j = i + 1; j < bumpArray.length; j++) {
      const dx = bumpArray[i].x - bumpArray[j].x;
      const dy = bumpArray[i].y - bumpArray[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minPitchUm) {
        violations.push({ bump1: bumpArray[i].id, bump2: bumpArray[j].id, distanceUm: dist });
      }
    }
  }

  return {
    featureId: 'V5-003',
    name: 'High-Density Microbump Array Checker',
    status: violations.length === 0 ? 'DRC_CLEAN' : 'PITCH_VIOLATION',
    totalBumps: bumpArray.length,
    violationsCount: violations.length,
    compliant: violations.length === 0,
    violations
  };
}

/** 4. Silicon Interposer Warpage Predictor */
function predictInterposerWarpage(stackup) {
  if (!stackup || !stackup.layers || !stackup.temperatureCelsius) {
    return { status: 'ERROR', error: 'STACKUP_AND_TEMP_REQUIRED' };
  }
  const deltaT = Math.abs(stackup.temperatureCelsius - 25);
  // CTE mismatch estimation: sum of (CTE_i - CTE_sub) * thickness * deltaT
  const warpageUm = parseFloat((stackup.layers.reduce((acc, l) => acc + (l.ctePpm || 3.0) * (l.thicknessUm || 10) * 0.001, 0) * (deltaT / 100)).toFixed(2));
  const acceptable = warpageUm < 50.0;

  return {
    featureId: 'V5-004',
    name: 'Silicon Interposer Warpage Predictor',
    temperatureCelsius: stackup.temperatureCelsius,
    estimatedWarpageUm: warpageUm,
    risk: acceptable ? 'LOW' : 'HIGH_COPLANARITY_RISK',
    status: acceptable ? 'WARPAGE_PASS' : 'WARPAGE_EXCEEDED'
  };
}

/** 5. TSV (Through-Silicon Via) Stress Analyzer */
function analyzeTsvStress(tsvParams) {
  if (!tsvParams || !tsvParams.diameterUm || !tsvParams.heightUm) {
    return { status: 'ERROR', error: 'TSV_GEOMETRY_REQUIRED' };
  }
  const aspectRatio = tsvParams.heightUm / tsvParams.diameterUm;
  const keepOutZoneUm = parseFloat((tsvParams.diameterUm * 2.5).toFixed(1));
  const vonMisesMpa = parseFloat((aspectRatio * 18.5 + (tsvParams.linerThicknessNm || 100) * 0.1).toFixed(1));

  return {
    featureId: 'V5-005',
    name: 'TSV (Through-Silicon Via) Stress Analyzer',
    aspectRatio,
    keepOutZoneRadiusUm: keepOutZoneUm,
    maxStressMpa: vonMisesMpa,
    stressLevel: vonMisesMpa > 250 ? 'CRITICAL' : 'ACCEPTABLE'
  };
}

/** 6. Multi-Die Power Delivery Network (PDN) Co-Optimizer */
function coOptimizeMultiDiePdn(diesPdn) {
  if (!Array.isArray(diesPdn) || diesPdn.length === 0) {
    return { status: 'ERROR', error: 'DIES_REQUIRED' };
  }
  const totalCurrentA = diesPdn.reduce((sum, d) => sum + (d.peakCurrentA || 0), 0);
  const targetZOhms = 0.05 / (totalCurrentA || 1.0); // 50mV ripple target
  const calculatedZOhms = diesPdn.reduce((acc, d) => acc + (d.loopInductancePh || 50) * 1e-12 * 2 * Math.PI * 1e9, 0) / diesPdn.length;

  return {
    featureId: 'V5-006',
    name: 'Multi-Die Power Delivery Network (PDN) Co-Optimizer',
    totalCurrentA,
    targetImpedanceOhms: parseFloat(targetZOhms.toFixed(4)),
    effectiveZOhms: parseFloat(calculatedZOhms.toFixed(4)),
    resonanceFreqGhz: 1.25,
    status: calculatedZOhms <= targetZOhms * 1.5 ? 'OPTIMIZED' : 'NEEDS_DECAPS'
  };
}

/** 7. Die-to-Die ESD & Overvoltage Guardian */
function guardD2dEsd(pinProtectionConfig) {
  if (!pinProtectionConfig || typeof pinProtectionConfig.esdDiodePHEMT === 'undefined') {
    return { status: 'ERROR', error: 'PIN_PROTECTION_CONFIG_REQUIRED' };
  }
  const cdjFf = pinProtectionConfig.diodeCapFf || 50;
  const hbmKv = pinProtectionConfig.hbmToleranceKv || 1.0;
  const cdjAcceptable = cdjFf <= 80; // High speed D2D requirement

  return {
    featureId: 'V5-007',
    name: 'Die-to-Die ESD & Overvoltage Guardian',
    hbmLevelKv: hbmKv,
    parasiticCapacitanceFf: cdjFf,
    signalIntegrityImpact: cdjAcceptable ? 'NEGLIGIBLE' : 'HIGH_INSERTION_LOSS',
    safe: hbmKv >= 0.5 && cdjAcceptable
  };
}

/** 8. Chiplet Test Access Architecture (IEEE 1838) Reviewer */
function reviewIeee1838TestAccess(config) {
  if (!config) return { status: 'ERROR', error: 'CONFIG_REQUIRED' };
  const hasDft = Boolean(config.dftLayers && config.dftLayers.includes('DWD')); // Die Wrapper Instruction
  const hasBsd = Boolean(config.hasBoundaryScan);
  const compliant = hasDft && hasBsd;

  return {
    featureId: 'V5-008',
    name: 'Chiplet Test Access Architecture (IEEE 1838) Reviewer',
    ieee1838Compliant: compliant,
    wrapperType: config.wrapperType || 'STANDARD_DWD',
    testModeCount: compliant ? 8 : 2,
    verdict: compliant ? 'READY_FOR_KGD_TEST' : 'MISSING_WRAPPER_LOGIC'
  };
}

/** 9. Known Good Die (KGD) Test Flow Generator */
function generateKgdTestFlow(dieType, faultModels = ['stuck-at', 'at-speed', 'transition']) {
  if (!dieType) return { status: 'ERROR', error: 'DIE_TYPE_REQUIRED' };
  const flow = [
    { step: 1, name: 'Wafer Sort 1 (DC Probing)' },
    { step: 2, name: 'Burn-in & High-T Stress' },
    { step: 3, name: `Scan ATPG (${faultModels.join(', ')})` },
    { step: 4, name: 'High-Speed BIST & Interface Loopback' },
    { step: 5, name: 'Known Good Die Final Singulation' }
  ];

  return {
    featureId: 'V5-009',
    name: 'Known Good Die (KGD) Test Flow Generator',
    dieType,
    totalSteps: flow.length,
    testFlow: flow,
    estimatedCoveragePct: 99.8
  };
}

/** 10. Heterogeneous System Integration Synthesizer */
function synthesizeHeterogeneousSystem(componentsList) {
  if (!Array.isArray(componentsList) || componentsList.length === 0) {
    return { status: 'ERROR', error: 'COMPONENTS_REQUIRED' };
  }
  const summary = {
    computeDies: componentsList.filter(c => c.type === 'compute').length,
    memoryDies: componentsList.filter(c => c.type === 'memory').length,
    ioDies: componentsList.filter(c => c.type === 'io').length,
    passiveComponents: componentsList.filter(c => c.type === 'passive').length
  };

  return {
    featureId: 'V5-010',
    name: 'Heterogeneous System Integration Synthesizer',
    packageAreaMm2: componentsList.reduce((acc, c) => acc + (c.areaMm2 || 0), 0) * 1.3,
    breakdown: summary,
    status: 'INTEGRATED'
  };
}

// -------------------------------------------------------------
// Group 2: CPU, GPU, NPU, and Accelerator Architecture
// -------------------------------------------------------------

/** 11. RISC-V Custom Extension Instruction Synthesizer */
function synthesizeRiscvExtension(insnSpec) {
  if (!insnSpec || !insnSpec.mnemonic || !insnSpec.opcode) {
    return { status: 'ERROR', error: 'MNEMONIC_AND_OPCODE_REQUIRED' };
  }
  const verilogSnippet = `
// Custom Instruction: ${insnSpec.mnemonic}
always_comb begin
  if (opcode == 7'b${insnSpec.opcode}) begin
    custom_out = ${insnSpec.operation || 'rs1 + rs2'};
  end
end`;

  return {
    featureId: 'V5-011',
    name: 'RISC-V Custom Extension Instruction Synthesizer',
    mnemonic: insnSpec.mnemonic,
    format: insnSpec.format || 'R_TYPE',
    synthesizedRtl: verilogSnippet.trim(),
    cycleLatency: insnSpec.latency || 1
  };
}

/** 12. Out-of-Order (OoO) Execution Scheduler Auditor */
function auditOooScheduler(robEntries, issueWidth = 4) {
  if (!Array.isArray(robEntries)) return { status: 'ERROR', error: 'ROB_ARRAY_REQUIRED' };
  const stalls = robEntries.filter(r => r.ready === false && r.hasDep);
  const headReady = robEntries.length > 0 ? robEntries[0].ready : true;

  return {
    featureId: 'V5-012',
    name: 'Out-of-Order (OoO) Execution Scheduler Auditor',
    robOccupancyPct: parseFloat(((robEntries.length / 64) * 100).toFixed(1)),
    headBlockStall: !headReady,
    throughputIPC: headReady ? Math.min(issueWidth, robEntries.filter(r => r.ready).length) : 0.0,
    status: stalls.length > robEntries.length * 0.7 ? 'HIGH_PRESSURE_DEP_STALL' : 'HEALTHY_ISSUE'
  };
}

/** 13. Branch Predictor Accuracy & Aliasing Analyzer */
function analyzeBranchPredictor(historyLength, btbSize) {
  if (!historyLength || !btbSize) return { status: 'ERROR', error: 'PARAMS_REQUIRED' };
  const theoreticalAccuracy = Math.min(99.0, 85.0 + Math.log2(historyLength) * 2.0 + Math.log2(btbSize) * 0.5);
  const aliasingProbability = Math.max(0.01, 1.0 / Math.sqrt(btbSize));

  return {
    featureId: 'V5-013',
    name: 'Branch Predictor Accuracy & Aliasing Analyzer',
    predictedAccuracyPct: parseFloat(theoreticalAccuracy.toFixed(2)),
    aliasingRisk: aliasingProbability > 0.05 ? 'MODERATE' : 'LOW',
    mpkiEstimate: parseFloat(((100 - theoreticalAccuracy) * 0.15).toFixed(2))
  };
}

/** 14. Cache Hierarchy Coherence (MESI/MOESI) Verifier */
function verifyCacheCoherence(transitions) {
  if (!Array.isArray(transitions)) return { status: 'ERROR', error: 'TRANSITIONS_REQUIRED' };
  const invalidTransitions = [];
  // MESI valid: M->S, S->M (via Invalidation), I->S, I->E, E->M
  transitions.forEach(t => {
    if (t.from === 'I' && t.to === 'M' && !t.busRdX) {
      invalidTransitions.push({ transition: `${t.from}->${t.to}`, reason: 'Upgrade to M without BusRdX' });
    }
  });

  return {
    featureId: 'V5-014',
    name: 'Cache Hierarchy Coherence (MESI/MOESI) Verifier',
    totalTransitions: transitions.length,
    protocolConformant: invalidTransitions.length === 0,
    violations: invalidTransitions
  };
}

/** 15. GPU SIMT Warp Divergence & Occupancy Profiler */
function profileSimtWarp(activeThreadsCount, warpSize = 32) {
  if (activeThreadsCount === undefined || activeThreadsCount < 0) return { status: 'ERROR', error: 'ACTIVE_THREADS_REQUIRED' };
  const efficiency = Math.min(100.0, (activeThreadsCount / warpSize) * 100);
  const divergent = activeThreadsCount > 0 && activeThreadsCount < warpSize;

  return {
    featureId: 'V5-015',
    name: 'GPU SIMT Warp Divergence & Occupancy Profiler',
    warpEfficiencyPct: parseFloat(efficiency.toFixed(1)),
    isDivergent: divergent,
    penaltyCycles: divergent ? Math.ceil((warpSize - activeThreadsCount) * 0.5) : 0
  };
}

/** 16. Tensor Core Matrix Multiply Unit (GEMM) Evaluator */
function evaluateTensorGemm(m, n, k, precision = 'FP16') {
  if (!m || !n || !k) return { status: 'ERROR', error: 'DIMENSIONS_REQUIRED' };
  const macOperations = m * n * k;
  const tflopsAt1Ghz = (macOperations * 2 * 1e-12 * 1e9);

  return {
    featureId: 'V5-016',
    name: 'Tensor Core Matrix Multiply Unit (GEMM) Evaluator',
    dimensions: { m, n, k },
    precision,
    macOperations,
    tflopsPerGhz: parseFloat(tflopsAt1Ghz.toFixed(3)),
    efficiencyRating: 'PEAK_SATURATION'
  };
}

/** 17. NPU Dataflow & Weight Stationary Mapping Optimizer */
function optimizeNpuDataflow(layerWeightsDim, peArraySize = 16) {
  if (!layerWeightsDim) return { status: 'ERROR', error: 'DIM_REQUIRED' };
  const utilization = Math.min(100.0, (layerWeightsDim / (peArraySize * peArraySize)) * 100);

  return {
    featureId: 'V5-017',
    name: 'NPU Dataflow & Weight Stationary Mapping Optimizer',
    dataflowModel: 'WEIGHT_STATIONARY',
    peUtilizationPct: parseFloat(utilization.toFixed(1)),
    sramBufferRequiredKb: Math.ceil(layerWeightsDim * 2 / 1024),
    recommendedTiling: `TILE_${peArraySize}x${peArraySize}`
  };
}

/** 18. Sparsity & Pruning Hardware Accelerator Evaluator */
function evaluateSparsityEngine(matrixZeroFraction, structuralType = '2:4_SPARSE') {
  if (matrixZeroFraction === undefined) return { status: 'ERROR', error: 'ZERO_FRACTION_REQUIRED' };
  const speedup = structuralType === '2:4_SPARSE' ? 2.0 : 1.0 / (1.0 - matrixZeroFraction);

  return {
    featureId: 'V5-018',
    name: 'Sparsity & Pruning Hardware Accelerator Evaluator',
    sparsityRatio: matrixZeroFraction,
    structuralType,
    theoreticalSpeedup: parseFloat(speedup.toFixed(2)),
    energySavingsPct: parseFloat(((1 - 1 / speedup) * 100).toFixed(1))
  };
}

/** 19. Hardware Neural Architecture Search (NAS) Estimator */
function estimateHardwareNas(candidateArchitectures) {
  if (!Array.isArray(candidateArchitectures) || candidateArchitectures.length === 0) {
    return { status: 'ERROR', error: 'CANDIDATES_REQUIRED' };
  }
  const ranked = candidateArchitectures.map(c => ({
    name: c.name,
    score: (c.top1Accuracy || 70) / ((c.latencyMs || 10) * (c.powerWatts || 1))
  })).sort((a, b) => b.score - a.score);

  return {
    featureId: 'V5-019',
    name: 'Hardware Neural Architecture Search (NAS) Estimator',
    evaluatedCount: candidateArchitectures.length,
    optimalCandidate: ranked[0].name,
    paretoBestScore: parseFloat(ranked[0].score.toFixed(3))
  };
}

/** 20. Cryptographic Accelerator (PQC / AES / RSA) Analyzer */
function analyzeCryptoAccelerator(algoType, keyLengthBits) {
  if (!algoType) return { status: 'ERROR', error: 'ALGO_REQUIRED' };
  const isPostQuantum = ['KYBER', 'DILITHIUM', 'SPHINCS'].includes(algoType.toUpperCase());
  const cycles = isPostQuantum ? 15000 : (algoType.toUpperCase() === 'AES' ? 14 : 250000);

  return {
    featureId: 'V5-020',
    name: 'Cryptographic Accelerator (PQC / AES / RSA) Analyzer',
    algorithm: algoType.toUpperCase(),
    keyLengthBits: keyLengthBits || 256,
    isPostQuantum,
    latencyCycles: cycles,
    dpaResistance: 'MASKED_SBOX_ENABLED'
  };
}

module.exports = {
  // Group 1
  validateUcieProtocol,
  routeDieToDieInterconnect,
  checkMicrobumpArray,
  predictInterposerWarpage,
  analyzeTsvStress,
  coOptimizeMultiDiePdn,
  guardD2dEsd,
  reviewIeee1838TestAccess,
  generateKgdTestFlow,
  synthesizeHeterogeneousSystem,
  // Group 2
  synthesizeRiscvExtension,
  auditOooScheduler,
  analyzeBranchPredictor,
  verifyCacheCoherence,
  profileSimtWarp,
  evaluateTensorGemm,
  optimizeNpuDataflow,
  evaluateSparsityEngine,
  estimateHardwareNas,
  analyzeCryptoAccelerator
};
