/**
 * SEMICONDUCTOR ENGINEERING COPILOT V4.0 - MASTER INDEX
 * Aggregates all 100 features across Groups A-J
 */

const { V4CoreIntelligence } = require('./req-spec/v4_core_intelligence');
const { V4VerificationDebug } = require('./verif-planning/v4_verif_debug');
const { V4TimingEdaOps } = require('./timing-opt/v4_timing_eda_ops');
const secMcp = require('./sec-gov/v4_sec_mcp');
const dataTesting = require('./data-analytics/v4_data_testing');

const coreInst = new V4CoreIntelligence();
const verifInst = new V4VerificationDebug();
const timingInst = new V4TimingEdaOps();

module.exports = {
  version: '4.0.0',
  classes: {
    V4CoreIntelligence,
    V4VerificationDebug,
    V4TimingEdaOps
  },
  instances: {
    core: coreInst,
    verif: verifInst,
    timing: timingInst
  },
  groups: {
    A_requirements: {
      detectAmbiguity: coreInst.detectAmbiguity.bind(coreInst),
      scoreCompleteness: coreInst.scoreCompleteness.bind(coreInst),
      trackRequirementChanges: coreInst.trackRequirementChanges.bind(coreInst),
      generateAcceptanceCriteria: coreInst.generateAcceptanceCriteria.bind(coreInst),
      resolveConflicts: coreInst.resolveConflicts.bind(coreInst),
      registerAssumption: coreInst.registerAssumption.bind(coreInst),
      classifyRisk: coreInst.classifyRisk.bind(coreInst),
      linkArtifact: coreInst.linkArtifact.bind(coreInst),
      visualizeSpecDiff: coreInst.visualizeSpecDiff.bind(coreInst),
      approveRequirement: coreInst.approveRequirement.bind(coreInst)
    },
    B_rtl_quality: {
      lintRtlStandards: coreInst.lintRtlStandards.bind(coreInst),
      detectLatches: coreInst.detectLatches.bind(coreInst),
      auditAssignments: coreInst.auditAssignments.bind(coreInst),
      analyzeWidthSignedness: coreInst.analyzeWidthSignedness.bind(coreInst),
      adviseFsmEncoding: coreInst.adviseFsmEncoding.bind(coreInst),
      detectCombinationalLoops: coreInst.detectCombinationalLoops.bind(coreInst),
      detectIncompleteCase: coreInst.detectIncompleteCase.bind(coreInst),
      checkResetPolarity: coreInst.checkResetPolarity.bind(coreInst),
      mapComplexityHotspots: coreInst.mapComplexityHotspots.bind(coreInst),
      syncDocumentation: coreInst.syncDocumentation.bind(coreInst)
    },
    C_verif_planning: {
      mapPlanCoverage: verifInst.mapPlanCoverage.bind(verifInst),
      combineTestScenarios: verifInst.combineTestScenarios.bind(verifInst),
      generateBoundaryScenarios: verifInst.generateBoundaryScenarios.bind(verifInst),
      generateTemporalSequence: verifInst.generateTemporalSequence.bind(verifInst),
      adviseRandomConstraints: verifInst.adviseRandomConstraints.bind(verifInst),
      findReusableTbComponents: verifInst.findReusableTbComponents.bind(verifInst),
      checkScoreboardConsistency: verifInst.checkScoreboardConsistency.bind(verifInst),
      crossCheckReferenceModel: verifInst.crossCheckReferenceModel.bind(verifInst),
      analyzeOracleReliability: verifInst.analyzeOracleReliability.bind(verifInst),
      evaluateVerificationExit: verifInst.evaluateVerificationExit.bind(verifInst)
    },
    D_sim_debug: {
      profileSimulatorCapabilities: verifInst.profileSimulatorCapabilities.bind(verifInst),
      validateSimulationConfig: verifInst.validateSimulationConfig.bind(verifInst),
      classifyCompileError: verifInst.classifyCompileError.bind(verifInst),
      classifyExitCode: verifInst.classifyExitCode.bind(verifInst),
      navigateWaveform: verifInst.navigateWaveform.bind(verifInst),
      correlateTimelineEvents: verifInst.correlateTimelineEvents.bind(verifInst),
      checkSignalInvariant: verifInst.checkSignalInvariant.bind(verifInst),
      detectRaceCondition: verifInst.detectRaceCondition.bind(verifInst),
      checkHangWatchdog: verifInst.checkHangWatchdog.bind(verifInst),
      packageDebugEvidence: verifInst.packageDebugEvidence.bind(verifInst)
    },
    E_timing_opt: {
      auditConstraintCoverage: timingInst.auditConstraintCoverage.bind(timingInst),
      checkClockDefinitionConsistency: timingInst.checkClockDefinitionConsistency.bind(timingInst),
      reviewTimingExceptions: timingInst.reviewTimingExceptions.bind(timingInst),
      classifyTimingPath: timingInst.classifyTimingPath.bind(timingInst),
      analyzeViolationTrend: timingInst.analyzeViolationTrend.bind(timingInst),
      predictConstraintChangeImpact: timingInst.predictConstraintChangeImpact.bind(timingInst),
      normalizeTimingReport: timingInst.normalizeTimingReport.bind(timingInst),
      trackExperiment: timingInst.trackExperiment.bind(timingInst),
      calculateParetoFrontier: timingInst.calculateParetoFrontier.bind(timingInst),
      trackClosureAction: timingInst.trackClosureAction.bind(timingInst)
    },
    F_eda_ops: {
      fingerprintEnvironment: timingInst.fingerprintEnvironment.bind(timingInst),
      checkVersionCompatibility: timingInst.checkVersionCompatibility.bind(timingInst),
      mapLicenseFeature: timingInst.mapLicenseFeature.bind(timingInst),
      estimateComputeResources: timingInst.estimateComputeResources.bind(timingInst),
      assignJobPriority: timingInst.assignJobPriority.bind(timingInst),
      validateRemoteWorkspace: timingInst.validateRemoteWorkspace.bind(timingInst),
      checkNfsHealth: timingInst.checkNfsHealth.bind(timingInst),
      detectOrphanProcesses: timingInst.detectOrphanProcesses.bind(timingInst),
      testToolUpgradeSafety: timingInst.testToolUpgradeSafety.bind(timingInst),
      detectEnvironmentDrift: timingInst.detectEnvironmentDrift.bind(timingInst)
    },
    G_security_gov: {
      enforceLeastPrivilege: secMcp.enforceLeastPrivilege,
      validateCommandAllowlist: secMcp.validateCommandAllowlist,
      scanSensitiveRtl: secMcp.scanSensitiveRtl,
      detectSecrets: secMcp.detectSecrets,
      validateIpAccessBoundary: secMcp.validateIpAccessBoundary,
      classifyArtifact: secMcp.classifyArtifact,
      verifyAuditLogIntegrity: secMcp.verifyAuditLogIntegrity,
      enforceApprovalGate: secMcp.enforceApprovalGate,
      evaluateRetentionPolicy: secMcp.evaluateRetentionPolicy,
      auditThirdPartyLicenses: secMcp.auditThirdPartyLicenses
    },
    H_mcp_collab: {
      negotiateMcpProtocol: secMcp.negotiateMcpProtocol,
      generateMcpManifest: secMcp.generateMcpManifest,
      sanitizeToolInput: secMcp.sanitizeToolInput,
      trackOutputProvenance: secMcp.trackOutputProvenance,
      validateAgentHandoff: secMcp.validateAgentHandoff,
      checkLoopPrevention: secMcp.checkLoopPrevention,
      suppressDuplicateExecution: secMcp.suppressDuplicateExecution,
      testAdapterConformance: secMcp.testAdapterConformance,
      executeWithRecovery: secMcp.executeWithRecovery,
      logDecisionTrace: secMcp.logDecisionTrace
    },
    I_data_analytics: {
      validateDataset: dataTesting.validateDataset,
      normalizeEdaReport: dataTesting.normalizeEdaReport,
      recordTrendPoint: dataTesting.recordTrendPoint,
      evaluateKpis: dataTesting.evaluateKpis,
      detectAndExplainOutliers: dataTesting.detectAndExplainOutliers,
      generateEvidenceCitation: dataTesting.generateEvidenceCitation,
      checkArtifactFreshness: dataTesting.checkArtifactFreshness,
      searchDecisions: dataTesting.searchDecisions,
      mineCommonPatterns: dataTesting.mineCommonPatterns,
      buildDataLineage: dataTesting.buildDataLineage
    },
    J_testing_release: {
      prioritizeTestsByChange: dataTesting.prioritizeTestsByChange,
      getSmokeTestProfile: dataTesting.getSmokeTestProfile,
      traceUnitToSmoke: dataTesting.traceUnitToSmoke,
      evaluateSentinelHealth: dataTesting.evaluateSentinelHealth,
      validateReleaseCandidate: dataTesting.validateReleaseCandidate,
      verifyRollbackState: dataTesting.verifyRollbackState,
      evaluateFlakiness: dataTesting.evaluateFlakiness,
      detectDurationRegression: dataTesting.detectDurationRegression,
      buildEvidenceBundle: dataTesting.buildEvidenceBundle,
      validatePostReleaseHealth: dataTesting.validatePostReleaseHealth
    }
  }
};
