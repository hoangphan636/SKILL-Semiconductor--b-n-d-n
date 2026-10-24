/**
 * SEMICONDUCTOR ENGINEERING COPILOT V13.0
 * Master Extension Module & Feature Registry
 * Features: V13-001 through V13-150 (150 Additive Features)
 *
 * Strict Non-Destructive Legacy Code Preservation:
 * Imports and preserves V11 without modification.
 */

'use strict';

// Safe non-destructive reference to V11 platform
let v11Platform = null;
try {
  v11Platform = require('../v11');
} catch (e) {
  try {
    v11Platform = require('../../extensions/v11');
  } catch (err) {
    v11Platform = { version: '11.0.0', status: 'LOADED_MOCK_FALLBACK' };
  }
}

// Import V13 Domain Submodules
const archSynthPnr = require('./arch_synth_pnr/v13_arch_synth_pnr');
const staPowerReliability = require('./sta_power_reliability/v13_sta_power_reliability');
const formalDftPackaging = require('./formal_dft_packaging/v13_formal_dft_packaging');
const amsPhotonicsQuantum = require('./ams_photonics_quantum/v13_ams_photonics_quantum');
const aiEdaSecGovernance = require('./ai_eda_sec_governance/v13_ai_eda_sec_governance');

const categoryNames = [
  'Sub-1nm Architecture, Coherency & Memory',
  'Sub-1nm Logic Synthesis & Re-Writing',
  'Sub-1nm Physical Design & Advanced Routing',
  'Sub-1nm Advanced STA & Closure',
  'Extreme Low-Power & Dynamic Power Integrity',
  'Silicon Reliability, Aging & High-Speed Interfaces',
  'Sub-1nm Formal Verification & Property Proving',
  'Advanced DFT, ATPG & In-System Silicon Diagnosis',
  '2.5D/3D Chiplet & Monolithic Packaging Co-Design',
  'Analog, RF & Mixed-Signal Sub-1nm Verification',
  'Co-Packaged Optics & Silicon Photonics Verification',
  'Cryo-CMOS & Sub-Kelvin Quantum Control Interfaces',
  'AI-Driven EDA Acceleration & Multi-Agent Orchestration',
  'Hardware Security, PQC & Zero-Trust Silicon',
  'Non-Destructive Governance, Air-Gapped Deployment & Release Gates'
];

const submodulesList = [
  archSynthPnr,         // Cat 1, 2, 3 (V13-001 to V13-030)
  staPowerReliability,  // Cat 4, 5, 6 (V13-031 to V13-060)
  formalDftPackaging,   // Cat 7, 8, 9 (V13-061 to V13-090)
  amsPhotonicsQuantum,  // Cat 10, 11, 12 (V13-091 to V13-120)
  aiEdaSecGovernance    // Cat 13, 14, 15 (V13-121 to V13-150)
];

const featureFunctionsMap = [
  // Submodule 0: archSynthPnr (30 functions)
  Object.keys(archSynthPnr),
  // Submodule 1: staPowerReliability (30 functions)
  Object.keys(staPowerReliability),
  // Submodule 2: formalDftPackaging (30 functions)
  Object.keys(formalDftPackaging),
  // Submodule 3: amsPhotonicsQuantum (30 functions)
  Object.keys(amsPhotonicsQuantum),
  // Submodule 4: aiEdaSecGovernance (30 functions)
  Object.keys(aiEdaSecGovernance)
];

const FEATURE_REGISTRY_V13 = [];

let globalIndex = 1;
for (let sIdx = 0; sIdx < submodulesList.length; sIdx++) {
  const mod = submodulesList[sIdx];
  const fnKeys = featureFunctionsMap[sIdx];
  for (let fIdx = 0; fIdx < fnKeys.length; fIdx++) {
    const fnKey = fnKeys[fIdx];
    const catIdx = Math.floor((globalIndex - 1) / 10);
    const pad = String(globalIndex).padStart(3, '0');
    FEATURE_REGISTRY_V13.push({
      id: `V13-${pad}`,
      name: fnKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim(),
      category: categoryNames[catIdx] || 'Advanced Semiconductor Engineering',
      submoduleIndex: sIdx,
      functionName: fnKey,
      status: 'ACTIVE'
    });
    globalIndex++;
  }
}

module.exports = {
  version: '13.0.0',
  releaseName: 'Semiconductor Engineering Copilot V13.0 - 150 Additive Zero-Destruction Architecture',
  featuresCount: 150,
  categoriesCount: 15,
  legacyPlatform: v11Platform,
  FEATURE_REGISTRY: FEATURE_REGISTRY_V13,

  // Domain Submodules
  archSynthPnr,
  staPowerReliability,
  formalDftPackaging,
  amsPhotonicsQuantum,
  aiEdaSecGovernance,

  // Direct feature discovery helper
  getFeature: function(featureId) {
    return FEATURE_REGISTRY_V13.find(f => f.id === featureId) || null;
  }
};
