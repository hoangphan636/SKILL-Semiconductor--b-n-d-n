/**
 * SEMICONDUCTOR ENGINEERING COPILOT V6.0 - EXTENSION REGISTRY INDEX
 * Completely additive module wrapper aggregating all 150 V6.0 capabilities
 * Preserves V1.0 - V5.0 without modification
 */

const part1 = require('./arch/v6_arch_interconnect_safety');
const part2 = require('./security/v6_sec_ams_physical');
const part3 = require('./power/v6_pwr_dft_pipelines');
const part4 = require('./testing/v6_test_ai_orchestration');
const part5 = require('./observability/v6_obs_release_gov');

const v5Platform = require('../../modules/v5/index');

const groups = [
  {
    cat: 'Advanced Microarchitecture',
    part: part1,
    names: [
      'simulateSuperscalarFetchPipeline',
      'auditRenameRegisterAliasTable',
      'evaluateStoreQueueForwarding',
      'verifyMemoryConsistencyModel',
      'analyzeVectorUnitChaining',
      'assessHardwarePrefetcherThrottling',
      'auditMmuTranslationLookasideBuffer',
      'evaluateInterruptControllerApic',
      'analyzeSimultaneousMultithreading',
      'modelDynamicVoltageFrequencyScaling'
    ]
  },
  {
    cat: 'NoC, Memory, and Interconnect',
    part: part1,
    names: [
      'routeMeshNocFlits',
      'evaluateVirtualChannelBufferCredit',
      'modelAxi5QosTrafficRegulator',
      'verifyChiCoherentHubInterface',
      'optimizeDramBankConflictInterleaving',
      'calculateCxlMemCoherencyLatency',
      'optimizeMemoryCompressionEngine',
      'modelHighBandwidthCrossbarSwitch',
      'allocateAtomicMemoryOperations',
      'trackInterconnectTelemetryCongestion'
    ]
  },
  {
    cat: 'Functional Safety and Fault Tolerance',
    part: part1,
    names: [
      'calculateAsilDSafetyMetrics',
      'verifyDualCoreLockstepComparator',
      'evaluateTripleModularRedundancy',
      'auditTransientSoftErrorInjection',
      'verifyBistLogicExecution',
      'inspectClockGlitchFaultDetector',
      'evaluateSafetyMechanismFailsafe',
      'auditMemoryEccSecDed',
      'calculateFmedaResidualRisk',
      'reviewWatchdogWindowTimer'
    ]
  },
  {
    cat: 'Hardware Security and Trust',
    part: part2,
    names: [
      'auditPufInterHammingDistance',
      'analyzePowerSideChannelResistance',
      'detectHardwareTrojanNets',
      'verifyRiscvPmpConfiguration',
      'evaluateFaultInjectionOpticalLaserGlitch',
      'manageHardwareCryptoKeyFuseBurning',
      'verifyBusEncryptionScrambler',
      'auditJtagSecurityLockdown',
      'verifyFormalSecurityInformationFlow',
      'evaluatePostQuantumHardwareSignoff'
    ]
  },
  {
    cat: 'Analog, RF, and Mixed-Signal Verification',
    part: part2,
    names: [
      'simulateSpicePllPhaseNoise',
      'analyzeAdcDynamicSndrEnob',
      'calibrateLdoTransientLoadRegulation',
      'checkRealNumberModel',
      'evaluateRfLowNoiseAmplifier',
      'modelCrystalOscillatorStartup',
      'auditSwitchedCapacitorChargeInjection',
      'verifyBandgapReferenceTemperatureCoefficient',
      'simulateAmsCoSimulationBridge',
      'calibrateDacDifferentialNonLinearity'
    ]
  },
  {
    cat: 'Physical Design and Manufacturing Handoff',
    part: part2,
    names: [
      'auditAdvancedNodeEuvDesignRules',
      'verifyAntennaEffectRatio',
      'analyzeCmpMetalDensityFill',
      'verifyFinFetGaaPinAccessibility',
      'evaluateLithographyHotspotAerialImage',
      'analyzeBacksidePowerDeliveryNetwork',
      'generateGdsiiToOasisCompression',
      'evaluateCriticalDimensionUniformity',
      'auditFillCellLeakageImpact',
      'sealMaskMakingElectronicDataMebes'
    ]
  },
  {
    cat: 'Power, Performance, and Energy Modeling',
    part: part3,
    names: [
      'simulateUpfMultiVoltageStateTransitions',
      'calculateGateLevelPeakPowerRtlVcd',
      'auditClockGatingEfficiency',
      'estimateTotalLeakageSubthresholdGate',
      'auditVoltageDropDynamicPdn',
      'evaluateThermalResistanceDieHeatSink',
      'optimizePpaEnergyDelayProduct',
      'evaluatePowerSwitchRushCurrent',
      'analyzeThermalThrottlingGovernor',
      'balanceMultiCornerMultiModeLeakageTiming'
    ]
  },
  {
    cat: 'DFT, Scan, and Test Coverage',
    part: part3,
    names: [
      'compressAtpgScanTestPatterns',
      'verifyHierarchicalCoreScanIsolation',
      'analyzeAtSpeedTransitionFaultCoverage',
      'evaluateBoundaryScanIeee1149Dot1',
      'auditMbistRetentionMarchAlgorithms',
      'optimizeScanChainBalancing',
      'evaluateAnalogMixedSignalDftBist',
      'auditFunctionalSafetySafeFsmEncoding',
      'reviewScanPowerSafetyClockStaggering',
      'analyzeDiagnosisYieldImprovement'
    ]
  },
  {
    cat: 'Data Pipelines and Distributed EDA',
    part: part3,
    names: [
      'optimizeSlurmBatchJobArray',
      'cacheEdaIntermediateBuildArtifacts',
      'ingestRealTimeSimulationStreamingLogs',
      'checkDistributedStorageNfsLatency',
      'manageParquetEdaMetricDataLake',
      'evaluateKafkaEdaEventBus',
      'syncMultiGeoPdkWorkspaceSync',
      'monitorDockerContainerResourceSandbox',
      'arbitrateMultiServerFlexlmLicenseQueue',
      'verifyCryptographicProvenanceEdaArtifact'
    ]
  },
  {
    cat: 'Test Engineering and Non-Destructive Upgrade',
    part: part4,
    names: [
      'verifyNonDestructiveFileIntegrity',
      'verifyStrictBackwardCompatibilityPublicApis',
      'isolateRollbackSandboxEnvironment',
      'detectFlakyTestDeterministicQuarantine',
      'analyzeMutationTestingOperatorScore',
      'calculateParallelWorkerTestSchedulingLoad',
      'verifyGoldenReferenceArtifactHashTree',
      'auditPropertyBasedFuzzingInvariantInvocations',
      'recordContinuousQualityGateTelemetryLog',
      'verifyAdditiveUpgradeArtifactNamespaceIsolation'
    ]
  },
  {
    cat: 'AI Model Quality and Evaluation',
    part: part4,
    names: [
      'detectRtlCodeHallucinationGrounding',
      'benchmarkVerilogSynthesizabilityPassRate',
      'evaluateLlmSvaSemanticEquivalence',
      'guardLlmPromptInjectionHardwareContext',
      'auditModelTrainedPdkDataLeakage',
      'evaluateFewShotRagSemiconductorRetrievalAccuracy',
      'trackEdaFineTunedModelDrift',
      'verifyDeterministicTemperatureSampling',
      'quantifyAiEngineeringConfidenceCalibrator',
      'benchmarkMultiTurnAgentConversationalMemory'
    ]
  },
  {
    cat: 'Workflow Orchestration and Human Approval',
    part: part4,
    names: [
      'executeTwoPersonRuleTapeoutSignoff',
      'auditIrreversibleOperationSafetyConfirmation',
      'trackInteractiveHumanInTheLoopReview',
      'recordFormalEngineeringChangeApprovalAudit',
      'arbitrateAgentConsensusConflict',
      'trackAutomatedWorkflowStepTimeout',
      'manageSafeCheckpointResumeOrchestrator',
      'auditCrossOrganizationalCleanRoomHandoff',
      'controlDynamicExecutionBypassEmergencyBrake',
      'capturePostMortemRootCauseAnalysisLedger'
    ]
  },
  {
    cat: 'Observability and Engineering Analytics',
    part: part5,
    names: [
      'generateOpenTelemetryEdaTraceSpans',
      'computePrometheusEdaServerMetrics',
      'modelSimulationRuntimeLinearRegressionPredictor',
      'detectDiskSpaceExhaustionPreEmption',
      'trackMultiRunTimingSlackConvergenceTrend',
      'summarizeEngineeringResourceCostLedger',
      'auditNetworkSocketLatencyDistribution',
      'aggregateVerificationFailureHeatmap',
      'correlateEdaLogEntropyAnomalies',
      'queryEngineeringKnowledgeBaseGraph'
    ]
  },
  {
    cat: 'Packaging, Release, and Supply Chain',
    part: part5,
    names: [
      'generateCycloneDxSoftwareHardwareSbom',
      'auditThirdPartyIpVulnerabilitiesCve',
      'verifyCryptographicBinaryPackageDigest',
      'evaluateChipletInteroperabilityKpiMatrix',
      'trackFoundryPdkSemverEvolution',
      'auditHardwareSupplyChainChainOfCustody',
      'verifyAutomatedSemiconductorPackageDocumentation',
      'auditExportControlEccnClassification',
      'packageZeroFootprintCliContainerArtifact',
      'evaluateReleaseCandidateReadinessChecklist'
    ]
  },
  {
    cat: 'Enterprise Governance and Continuous Validation',
    part: part5,
    names: [
      'enforceSoxComplianceImmutableAuditTrail',
      'scanHardcodedCredentialsSecretRepository',
      'enforceRbacEnterprisePolicyMatrix',
      'verifyContinuousIntegrationEdaPipelineHealth',
      'enforceIpAccessProjectJail',
      'verifyEdaLicenseBudgetMonthlySpendingCap',
      'auditAutomatedPdkLegalLicensingNotice',
      'trackRealTimeWaferFabYieldOutlierAlert',
      'manageDisasterRecoveryWorkspaceGeoReplication',
      'produceMasterTapeoutSignoffEvidenceLedger'
    ]
  }
];

const categories = {};
const registry = [];
let idCount = 1;

groups.forEach((g, idx) => {
  const catKey = 'cat' + (idx + 1) + '_' + g.cat.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  categories[catKey] = {};
  g.names.forEach(name => {
    categories[catKey][name] = g.part[name];
    registry.push({
      id: 'V6-' + String(idCount).padStart(3, '0'),
      name: name,
      category: g.cat,
      fn: g.part[name]
    });
    idCount++;
  });
});

module.exports = {
  version: '6.0.0',
  legacyPlatform: v5Platform,
  categories,
  FEATURE_REGISTRY_V6: registry
};
