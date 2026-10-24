/**
 * Semiconductor Engineering Copilot - Master V9.0 Extension Entrypoint
 * Enforces Absolute Non-Destructive Legacy Code Preservation
 * Wraps V1-V8 platforms while exposing 150 new V9 capabilities (V9-001 through V9-150)
 */

'use strict';

// 1. Preserve and wrap legacy platforms
let legacyPlatform = null;
try {
  legacyPlatform = require('../v8/index.js');
} catch (e) {
  try {
    legacyPlatform = require('../extensions/v8/index.js');
  } catch (err) {
    legacyPlatform = { version: '8.0.0-compat', warning: 'Direct legacy load bypassed' };
  }
}

// 2. Load V9 Subsystems
const advPhysPdk = require('./adv_phys_pdk/v9_adv_phys_pdk.js');
const staRelUvm = require('./sta_rel_uvm/v9_sta_rel_uvm.js');
const covSecEda = require('./cov_sec_eda/v9_cov_sec_eda.js');
const dbgAgentKg = require('./dbg_agent_kg/v9_dbg_agent_kg.js');
const perfQaSec = require('./perf_qa_sec/v9_perf_qa_sec.js');

// 3. Category Metadata
const CATEGORIES_V9 = [
  { id: 1, name: 'Advanced-Node Design Intelligence', range: 'V9-001 - V9-010', module: 'adv_phys_pdk' },
  { id: 2, name: 'Physical Verification & Signoff', range: 'V9-011 - V9-020', module: 'adv_phys_pdk' },
  { id: 3, name: 'Library, IP & PDK Governance', range: 'V9-021 - V9-030', module: 'adv_phys_pdk' },
  { id: 4, name: 'Timing Signoff & Variation Analysis', range: 'V9-031 - V9-040', module: 'sta_rel_uvm' },
  { id: 5, name: 'EM/IR, Thermal & Aging', range: 'V9-041 - V9-050', module: 'sta_rel_uvm' },
  { id: 6, name: 'UVM & Testbench Engineering', range: 'V9-051 - V9-060', module: 'sta_rel_uvm' },
  { id: 7, name: 'Coverage Closure & Verification Planning', range: 'V9-061 - V9-070', module: 'cov_sec_eda' },
  { id: 8, name: 'Hardware Security Verification', range: 'V9-071 - V9-080', module: 'cov_sec_eda' },
  { id: 9, name: 'EDA Toolchain Compatibility', range: 'V9-081 - V9-090', module: 'cov_sec_eda' },
  { id: 10, name: 'Autonomous Debugging & Safe Repair', range: 'V9-091 - V9-100', module: 'dbg_agent_kg' },
  { id: 11, name: 'Multi-Agent Collaboration & Planning', range: 'V9-101 - V9-110', module: 'dbg_agent_kg' },
  { id: 12, name: 'Knowledge Graph & Engineering Memory', range: 'V9-111 - V9-120', module: 'dbg_agent_kg' },
  { id: 13, name: 'Performance & Resource Optimization', range: 'V9-121 - V9-130', module: 'perf_qa_sec' },
  { id: 14, name: 'Advanced QA & Continuous Validation', range: 'V9-131 - V9-140', module: 'perf_qa_sec' },
  { id: 15, name: 'Non-Destructive Upgrade & Supply-Chain Trust', range: 'V9-141 - V9-150', module: 'perf_qa_sec' }
];

// 4. Build Complete 150-Feature Registry
const FEATURE_REGISTRY_V9 = [];

function registerKeyRange(keys, startIdx, catId, moduleName, mapObj) {
  keys.forEach((fnKey, i) => {
    const num = startIdx + i;
    const id = `V9-${String(num).padStart(3, '0')}`;
    FEATURE_REGISTRY_V9.push({
      id,
      index: num,
      categoryId: catId,
      categoryName: CATEGORIES_V9[catId - 1].name,
      module: moduleName,
      functionName: fnKey,
      fn: mapObj[fnKey],
      status: 'IMPLEMENTED'
    });
  });
}

const r1Keys = Object.keys(advPhysPdk);
const r2Keys = Object.keys(staRelUvm);
const r3Keys = Object.keys(covSecEda);
const r4Keys = Object.keys(dbgAgentKg);
const r5Keys = Object.keys(perfQaSec);

// Cat 1-3
registerKeyRange(r1Keys.slice(0, 10), 1, 1, 'adv_phys_pdk', advPhysPdk);
registerKeyRange(r1Keys.slice(10, 20), 11, 2, 'adv_phys_pdk', advPhysPdk);
registerKeyRange(r1Keys.slice(20, 30), 21, 3, 'adv_phys_pdk', advPhysPdk);

// Cat 4-6
registerKeyRange(r2Keys.slice(0, 10), 31, 4, 'sta_rel_uvm', staRelUvm);
registerKeyRange(r2Keys.slice(10, 20), 41, 5, 'sta_rel_uvm', staRelUvm);
registerKeyRange(r2Keys.slice(20, 30), 51, 6, 'sta_rel_uvm', staRelUvm);

// Cat 7-9
registerKeyRange(r3Keys.slice(0, 10), 61, 7, 'cov_sec_eda', covSecEda);
registerKeyRange(r3Keys.slice(10, 20), 71, 8, 'cov_sec_eda', covSecEda);
registerKeyRange(r3Keys.slice(20, 30), 81, 9, 'cov_sec_eda', covSecEda);

// Cat 10-12
registerKeyRange(r4Keys.slice(0, 10), 91, 10, 'dbg_agent_kg', dbgAgentKg);
registerKeyRange(r4Keys.slice(10, 20), 101, 11, 'dbg_agent_kg', dbgAgentKg);
registerKeyRange(r4Keys.slice(20, 30), 111, 12, 'dbg_agent_kg', dbgAgentKg);

// Cat 13-15
registerKeyRange(r5Keys.slice(0, 10), 121, 13, 'perf_qa_sec', perfQaSec);
registerKeyRange(r5Keys.slice(10, 20), 131, 14, 'perf_qa_sec', perfQaSec);
registerKeyRange(r5Keys.slice(20, 30), 141, 15, 'perf_qa_sec', perfQaSec);

module.exports = {
  version: '9.0.0',
  name: 'semiconductor-engineering-copilot-v9',
  description: 'Semiconductor Engineering Copilot V9.0 - 150 Advanced Additive Capabilities with Absolute Preservation',
  legacyPlatform,
  categories: CATEGORIES_V9,
  registry: FEATURE_REGISTRY_V9,
  subsystems: {
    advPhysPdk,
    staRelUvm,
    covSecEda,
    dbgAgentKg,
    perfQaSec
  },
  ...advPhysPdk,
  ...staRelUvm,
  ...covSecEda,
  ...dbgAgentKg,
  ...perfQaSec
};
