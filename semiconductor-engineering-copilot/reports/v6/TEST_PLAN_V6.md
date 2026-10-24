# TEST PLAN — SEMICONDUCTOR ENGINEERING COPILOT V6.0

## 1. Overview
The V6.0 test architecture provides layered, automated, non-destructive verification covering:
1. **Unit Tests**: Full functional verification of 150 individual capability endpoints.
2. **Smoke Tests**: 14 end-to-end multi-domain smoke scenarios (ST-001 through ST-014).
3. **Regression Preservation Tests**: Complete import, contract, and behavioral checks of V1 through V5 baselines.

## 2. Test Execution Commands & Structure
- **V6 Unit Test Suite**: `node ./tests/v6/unit/run_all_v6_tests.js` (Target: 150/150 Pass)
- **V6 Smoke Test Suite**: `node ./tests/v6/smoke/run_v6_smoke_tests.js` (Target: 14/14 Pass)
- **V6 Regression Suite**: `node ./tests/v6/regression/run_v6_regression_tests.js` (Target: 6/6 Pass)
- **Legacy Regression Suites**:
  - V5 Unit: `node ./tests/unit/run_all_v5_tests.js` (100 Tests)
  - V5 Smoke: `node ./tests/smoke/run_v5_smoke_tests.js` (12 Tests)
  - V5 E2E: `node ./tests/e2e/run_v5_e2e_tests.js` (10 Tests)
  - V4 Unit: `node ./tests/unit/run_all_v4_tests.js` (100 Tests)
  - V3 Unit: `node ./tests/unit/run_all_v3_tests.js` (68 Tests)
  - V2 Platform: `node ./tests/v2/run_v2_tests.js` (50 Tests)
  - V1 Contract: `node ./tests/run_tests.js` (12 Tests)

Total Comprehensive Workspace Pass Target: **522 / 522 Automated Tests**.
