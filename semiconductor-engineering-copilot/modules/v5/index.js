/**
 * SEMICONDUCTOR ENGINEERING COPILOT V5.0 - MASTER INDEX
 * Aggregates all 100 features across Groups 1-10 + V1-V4 backwards compatibility
 */

const chipletArch = require('./chiplet-pkg/v5_chiplet_arch');
const hsThermal = require('./hs-interfaces/v5_hs_thermal');
const emuAi = require('./emu-fpga/v5_emu_ai_eda');
const dataSilicon = require('./data-ip/v5_data_silicon');
const sysRelease = require('./sys-codesign/v5_sys_release');
const v4 = require('../v4/index');

module.exports = {
  version: '5.0.0',
  v4Baseline: v4,
  groups: {
    group1_chiplet_pkg: {
      validateUcieProtocol: chipletArch.validateUcieProtocol,
      routeDieToDieInterconnect: chipletArch.routeDieToDieInterconnect,
      checkMicrobumpArray: chipletArch.checkMicrobumpArray,
      predictInterposerWarpage: chipletArch.predictInterposerWarpage,
      analyzeTsvStress: chipletArch.analyzeTsvStress,
      coOptimizeMultiDiePdn: chipletArch.coOptimizeMultiDiePdn,
      guardD2dEsd: chipletArch.guardD2dEsd,
      reviewIeee1838TestAccess: chipletArch.reviewIeee1838TestAccess,
      generateKgdTestFlow: chipletArch.generateKgdTestFlow,
      synthesizeHeterogeneousSystem: chipletArch.synthesizeHeterogeneousSystem
    },
    group2_proc_accel: {
      synthesizeRiscvExtension: chipletArch.synthesizeRiscvExtension,
      auditOooScheduler: chipletArch.auditOooScheduler,
      analyzeBranchPredictor: chipletArch.analyzeBranchPredictor,
      verifyCacheCoherence: chipletArch.verifyCacheCoherence,
      profileSimtWarp: chipletArch.profileSimtWarp,
      evaluateTensorGemm: chipletArch.evaluateTensorGemm,
      optimizeNpuDataflow: chipletArch.optimizeNpuDataflow,
      evaluateSparsityEngine: chipletArch.evaluateSparsityEngine,
      estimateHardwareNas: chipletArch.estimateHardwareNas,
      analyzeCryptoAccelerator: chipletArch.analyzeCryptoAccelerator
    },
    group3_hs_interfaces: {
      analyzePam4EyeDiagram: hsThermal.analyzePam4EyeDiagram,
      adaptSerdesEqualizer: hsThermal.adaptSerdesEqualizer,
      checkSParameterIntegrity: hsThermal.checkSParameterIntegrity,
      decomposeJitter: hsThermal.decomposeJitter,
      marginDdr5Timing: hsThermal.marginDdr5Timing,
      analyzeHbm3Channel: hsThermal.analyzeHbm3Channel,
      evaluateCrosstalkCancellation: hsThermal.evaluateCrosstalkCancellation,
      validateIbisAmiModel: hsThermal.validateIbisAmiModel,
      modelOpticalCpo: hsThermal.modelOpticalCpo,
      profilePllPhaseNoise: hsThermal.profilePllPhaseNoise
    },
    group4_thermal_rel: {
      simulateThermalHotspots: hsThermal.simulateThermalHotspots,
      auditEmSheSignoff: hsThermal.auditEmSheSignoff,
      modelBtiDegradation: hsThermal.modelBtiDegradation,
      predictHciDegradation: hsThermal.predictHciDegradation,
      estimateTddbLifetime: hsThermal.estimateTddbLifetime,
      modelSerNeutron: hsThermal.modelSerNeutron,
      validateAecQ100Grade: hsThermal.validateAecQ100Grade,
      reviewEsdHbmCdm: hsThermal.reviewEsdHbmCdm,
      inspectCsamDelamination: hsThermal.inspectCsamDelamination,
      synthesizeBathtubCurve: hsThermal.synthesizeBathtubCurve
    },
    group5_emu_fpga: {
      partitionMultiFpgaDesign: emuAi.partitionMultiFpgaDesign,
      coordinateHybridCoEmulation: emuAi.coordinateHybridCoEmulation,
      configureIceSpeedbridge: emuAi.configureIceSpeedbridge,
      optimizeTdmCableLatency: emuAi.optimizeTdmCableLatency,
      accelerateEmulationCompile: emuAi.accelerateEmulationCompile,
      synthesizeDynamicProbes: emuAi.synthesizeDynamicProbes,
      analyzeJtagScanDump: emuAi.analyzeJtagScanDump,
      decompressLiveWaveform: emuAi.decompressLiveWaveform,
      validateHilAutomotiveEcu: emuAi.validateHilAutomotiveEcu,
      automateOscilloscopeBert: emuAi.automateOscilloscopeBert
    },
    group6_ai_eda: {
      placeMacrosDrl: emuAi.placeMacrosDrl,
      estimateGnnCongestion: emuAi.estimateGnnCongestion,
      localizeBugAndPatch: emuAi.localizeBugAndPatch,
      predictPostRouteTiming: emuAi.predictPostRouteTiming,
      searchSynthesisBayesian: emuAi.searchSynthesisBayesian,
      optimizeAnalogSizing: emuAi.optimizeAnalogSizing,
      synthesizeActiveLearningAssertions: emuAi.synthesizeActiveLearningAssertions,
      exploreGenerativeDiffusionSynthesis: emuAi.exploreGenerativeDiffusionSynthesis,
      estimatePinnIrDrop: emuAi.estimatePinnIrDrop,
      orchestrateAutonomousEdaFlow: emuAi.orchestrateAutonomousEdaFlow
    },
    group7_data_ip: {
      packageIpXactComponent: dataSilicon.packageIpXactComponent,
      detectRtlBreakingChanges: dataSilicon.detectRtlBreakingChanges,
      syncHardwareWorkspace: dataSilicon.syncHardwareWorkspace,
      trackAndPatchEco: dataSilicon.trackAndPatchEco,
      generateIpWatermark: dataSilicon.generateIpWatermark,
      manageEdaFileLocks: dataSilicon.manageEdaFileLocks,
      verifySpecToRtlSync: dataSilicon.verifySpecToRtlSync,
      validateCleanRoomIpExchange: dataSilicon.validateCleanRoomIpExchange,
      arbitrateLicenseQuota: dataSilicon.arbitrateLicenseQuota,
      sealTapeoutBundle: dataSilicon.sealTapeoutBundle
    },
    group8_silicon_val: {
      generateShmooPlot: dataSilicon.generateShmooPlot,
      parseStdfData: dataSilicon.parseStdfData,
      automateAmsLabOscilloscope: dataSilicon.automateAmsLabOscilloscope,
      localizeSiliconDefect: dataSilicon.localizeSiliconDefect,
      calculateSpcCpk: dataSilicon.calculateSpcCpk,
      clusterWaferDefects: dataSilicon.clusterWaferDefects,
      controlAdaptiveTest: dataSilicon.controlAdaptiveTest,
      optimizeMbistRepair: dataSilicon.optimizeMbistRepair,
      correlatePfaSemImage: dataSilicon.correlatePfaSemImage,
      manageHtolChamber: dataSilicon.manageHtolChamber
    },
    group9_sys_codesign: {
      routeTlm2Transactions: sysRelease.routeTlm2Transactions,
      syncCsrMemoryMap: sysRelease.syncCsrMemoryMap,
      generateBareMetalHal: sysRelease.generateBareMetalHal,
      correlateGem5Trace: sysRelease.correlateGem5Trace,
      profileEnergyPerInstruction: sysRelease.profileEnergyPerInstruction,
      verifyLowPowerMode: sysRelease.verifyLowPowerMode,
      benchmarkRtosLatency: sysRelease.benchmarkRtosLatency,
      checkSharedVirtualMemory: sysRelease.checkSharedVirtualMemory,
      verifySecureBootHandshake: sysRelease.verifySecureBootHandshake,
      orchestrateFullStackCoVerif: sysRelease.orchestrateFullStackCoVerif
    },
    group10_qa_release: {
      validateSpecToVerifMatrix: sysRelease.validateSpecToVerifMatrix,
      aggregateStaticDiagnostics: sysRelease.aggregateStaticDiagnostics,
      compareSimulationRegressionDeltas: sysRelease.compareSimulationRegressionDeltas,
      synthesizeTimingActionItems: sysRelease.synthesizeTimingActionItems,
      verifyChipletReadiness: sysRelease.verifyChipletReadiness,
      normalizeSiliconMeasurements: sysRelease.normalizeSiliconMeasurements,
      auditAdapterRecovery: sysRelease.auditAdapterRecovery,
      selectImpactedTests: sysRelease.selectImpactedTests,
      interceptSecurityBreach: sysRelease.interceptSecurityBreach,
      evaluateTapeoutGate: sysRelease.evaluateTapeoutGate
    }
  }
};
