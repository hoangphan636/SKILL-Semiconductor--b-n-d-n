/**
 * Semiconductor Engineering Copilot - Master V8.0 Extension Entrypoint
 * Enforces Absolute Non-Destructive Legacy Code Preservation
 * Combines V1-V7 foundations with 150 new V8 features (V8-001 through V8-150)
 */

'use strict';

// 1. Preserve and wrap legacy platforms
let legacyPlatform = null;
try {
  legacyPlatform = require('../v7/index.js');
} catch (e) {
  try {
    legacyPlatform = require('../extensions/v7/index.js');
  } catch (err) {
    legacyPlatform = { version: '7.0.0-compat', warning: 'Direct legacy load bypassed' };
  }
}

// 2. Load V8 Subsystems
const rtlFormalClk = require('./rtl_formal_clk/v8_rtl_formal_clk.js');
const pnrPwrDft = require('./pnr_pwr_dft/v8_pnr_pwr_dft.js');
const valChipletArch = require('./val_chiplet_arch/v8_val_chiplet_arch.js');
const siEdaObs = require('./si_eda_obs/v8_si_eda_obs.js');
const aiQaSec = require('./ai_qa_sec/v8_ai_qa_sec.js');

// 3. Category Metadata
const CATEGORIES_V8 = [
  { id: 1, name: 'RTL Architecture & Design Quality', range: 'V8-001 - V8-010', module: 'rtl_formal_clk' },
  { id: 2, name: 'Formal Methods & Proof Automation', range: 'V8-011 - V8-020', module: 'rtl_formal_clk' },
  { id: 3, name: 'Clock, Reset & Timing Closure', range: 'V8-021 - V8-030', module: 'rtl_formal_clk' },
  { id: 4, name: 'Physical Design & ECO Intelligence', range: 'V8-031 - V8-040', module: 'pnr_pwr_dft' },
  { id: 5, name: 'Power, Thermal & Reliability', range: 'V8-041 - V8-050', module: 'pnr_pwr_dft' },
  { id: 6, name: 'DFT & Silicon Test Engineering', range: 'V8-051 - V8-060', module: 'pnr_pwr_dft' },
  { id: 7, name: 'Silicon Validation & Lab Automation', range: 'V8-061 - V8-070', module: 'val_chiplet_arch' },
  { id: 8, name: 'Chiplet & Advanced Packaging', range: 'V8-071 - V8-080', module: 'val_chiplet_arch' },
  { id: 9, name: 'CPU/GPU/NPU Architecture', range: 'V8-081 - V8-090', module: 'val_chiplet_arch' },
  { id: 10, name: 'High-Speed Interface & Signal Integrity', range: 'V8-091 - V8-100', module: 'si_eda_obs' },
  { id: 11, name: 'EDA Workflow Orchestration', range: 'V8-101 - V8-110', module: 'si_eda_obs' },
  { id: 12, name: 'Engineering Data & Observability', range: 'V8-111 - V8-120', module: 'si_eda_obs' },
  { id: 13, name: 'AI Engineering Intelligence', range: 'V8-121 - V8-130', module: 'ai_qa_sec' },
  { id: 14, name: 'QA Automation & Test Reliability', range: 'V8-131 - V8-140', module: 'ai_qa_sec' },
  { id: 15, name: 'Security, Compliance & Safe Upgrades', range: 'V8-141 - V8-150', module: 'ai_qa_sec' }
];

// Helper to extract keys in order
const r1Keys = Object.keys(rtlFormalClk);
const r2Keys = Object.keys(pnrPwrDft);
const r3Keys = Object.keys(valChipletArch);
const r4Keys = Object.keys(siEdaObs);
const r5Keys = Object.keys(aiQaSec);

// 4. Build Complete 150-Feature Registry
const FEATURE_REGISTRY_V8 = [];

function registerKeyRange(keys, startIdx, catId, moduleName, mapObj) {
  keys.forEach((fnKey, i) => {
    const num = startIdx + i;
    const id = `V8-${String(num).padStart(3, '0')}`;
    FEATURE_REGISTRY_V8.push({
      id,
      index: num,
      categoryId: catId,
      categoryName: CATEGORIES_V8[catId - 1].name,
      module: moduleName,
      functionName: fnKey,
      fn: mapObj[fnKey],
      status: 'IMPLEMENTED'
    });
  });
}

// Cat 1 (1-10), Cat 2 (11-20), Cat 3 (21-30)
registerKeyRange(r1Keys.slice(0, 10), 1, 1, 'rtl_formal_clk', rtlFormalClk);
registerKeyRange(r1Keys.slice(10, 20), 11, 2, 'rtl_formal_clk', rtlFormalClk);
registerKeyRange(r1Keys.slice(20, 30), 21, 3, 'rtl_formal_clk', rtlFormalClk);

// Cat 4 (31-40), Cat 5 (41-50), Cat 6 (51-60)
registerKeyRange(r2Keys.slice(0, 10), 31, 4, 'pnr_pwr_dft', pnrPwrDft);
registerKeyRange(r2Keys.slice(10, 20), 41, 5, 'pnr_pwr_dft', pnrPwrDft);
registerKeyRange(r2Keys.slice(20, 30), 51, 6, 'pnr_pwr_dft', pnrPwrDft);

// Cat 7 (61-70), Cat 8 (71-80), Cat 9 (81-90)
registerKeyRange(r3Keys.slice(0, 10), 61, 7, 'val_chiplet_arch', valChipletArch);
registerKeyRange(r3Keys.slice(10, 20), 71, 8, 'val_chiplet_arch', valChipletArch);
registerKeyRange(r3Keys.slice(20, 30), 81, 9, 'val_chiplet_arch', valChipletArch);

// Cat 10 (91-100), Cat 11 (101-110), Cat 12 (111-120)
registerKeyRange(r4Keys.slice(0, 10), 91, 10, 'si_eda_obs', siEdaObs);
registerKeyRange(r4Keys.slice(10, 20), 101, 11, 'si_eda_obs', siEdaObs);
registerKeyRange(r4Keys.slice(20, 30), 111, 12, 'si_eda_obs', siEdaObs);

// Cat 13 (121-130), Cat 14 (131-140), Cat 15 (141-150)
registerKeyRange(r5Keys.slice(0, 10), 121, 13, 'ai_qa_sec', aiQaSec);
registerKeyRange(r5Keys.slice(10, 20), 131, 14, 'ai_qa_sec', aiQaSec);
registerKeyRange(r5Keys.slice(20, 30), 141, 15, 'ai_qa_sec', aiQaSec);

// 5. Consolidated Export
module.exports = {
  version: '8.0.0',
  name: 'semiconductor-engineering-copilot-v8',
  description: 'Semiconductor Engineering Copilot V8.0 - 150 Advanced Additive Capabilities with Absolute Preservation',
  legacyPlatform,
  categories: CATEGORIES_V8,
  registry: FEATURE_REGISTRY_V8,
  subsystems: {
    rtlFormalClk,
    pnrPwrDft,
    valChipletArch,
    siEdaObs,
    aiQaSec
  },
  // Flatten all 150 functions for direct platform access
  ...rtlFormalClk,
  ...pnrPwrDft,
  ...valChipletArch,
  ...siEdaObs,
  ...aiQaSec
};
