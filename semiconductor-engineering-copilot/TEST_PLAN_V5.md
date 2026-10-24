# TEST PLAN V5.0 — SEMICONDUCTOR ENGINEERING COPILOT

**Target:** Semiconductor Engineering Copilot V5.0  
**Test Lead:** QA Automation Lead & Principal Semiconductor Architect  
**Runtime:** Node.js v24.20.0 (Windows x64)  
**Execution Environment:** Offline-capable deterministic test harness  

---

## 1. Test Architecture Overview

The V5.0 verification pipeline enforces strict testing disciplines across 5 distinct test tiers:

```
[Tier 1: Smoke Tests] (tests/smoke/run_v5_smoke_tests.js) - 12 Mandatory Scenarios (<2 sec)
         |
[Tier 2: Unit Tests] (tests/unit/run_all_v5_tests.js) - 100 V5.0 Capabilities (Groups 1-10)
         |
[Tier 3: E2E Tests] (tests/e2e/run_v5_e2e_tests.js) - 10 Cross-Module Workflow Scenarios
         |
[Tier 4: Security & Contracts] (tests/security/, tests/contract/) - Boundaries & Leaks
         |
[Tier 5: Regressions] (tests/run_tests.js, run_v2_tests.js, run_all_v3_tests.js, run_all_v4_tests.js)
```

---

## 2. Test Execution Commands

To execute tests individually or collectively:

- **Run V5 Smoke Suite (12 Scenarios):**
  `node tests/smoke/run_v5_smoke_tests.js`
- **Run V5 Unit Suite (100 Features):**
  `node tests/unit/run_all_v5_tests.js`
- **Run V5 E2E Suite (10 Scenarios):**
  `node tests/e2e/run_v5_e2e_tests.js`
- **Run Full Comprehensive Offline Regression (All Versions):**
  `npm test` or:
  `node tests/smoke/run_v5_smoke_tests.js && node tests/e2e/run_v5_e2e_tests.js && node tests/unit/run_all_v5_tests.js && node tests/unit/run_all_v4_tests.js && node tests/unit/run_all_v3_tests.js && node tests/v2/run_v2_tests.js && node tests/run_tests.js`
