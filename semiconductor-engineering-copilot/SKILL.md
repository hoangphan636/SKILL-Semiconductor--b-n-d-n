---
name: semiconductor-engineering-copilot
description: Production-grade AI Semiconductor Engineering Platform V5.0. Full-lifecycle IC design, Chiplet & 2.5D/3D Advanced Packaging (UCIe 1.1/2.0), CPU/GPU/NPU Architecture, High-Speed Interfaces & Signal Integrity (PCIe Gen6/7 PAM4, SerDes CTLE/DFE, DDR5, HBM3e), Thermal & Reliability Aging (EM/SHE, BTI, TDDB), Multi-FPGA Emulation (SCE-MI), AI-Assisted EDA (DRL Placer, GNN Congestion), IP Lifecycle (IP-XACT 1685-2022), Silicon Characterization (Shmoo, ATE STDF, SPC Cpk), HW/SW Co-Design (TLM-2.0, Bare-Metal HAL), and Autonomous QA/E2E Verification (364 automated tests, 447 total platform capabilities).
---

# Semiconductor Engineering Copilot V5.0

A production-grade, modular, evidence-driven AI Semiconductor Engineering Platform supporting full-spectrum digital RTL, Chiplet/3D-IC, advanced packaging, processor architecture, high-speed signal integrity, thermal aging, multi-FPGA emulation, AI-assisted EDA research, silicon bring-up, and autonomous E2E release verification.

## 1. Operating Principles & Verification Rules

1. **Evidence First (REA Protocol)**: Never claim simulation passes, timing meets setup/hold, or synthesis succeeds without parsing the actual tool output or exit code. Always cite `file:line`, log timestamps, or raw tool stdout.
2. **Strict Tool Discovery Before Execution**: Never assume Synopsys VCS, Cadence Innovus, or Siemens Questa is installed or licensed. Always execute tool discovery (`scripts/discover_tools.py` or `scripts/discover_tools.js`) to probe available CLI binaries, environment variables (`LM_LICENSE_FILE`, `SNPSLMD_LICENSE_FILE`, `CDS_LIC_FILE`), and MCP adapters.
3. **No Secret or PDK Exfiltration**: Never send foundry proprietary PDK files (DRC/LVS decks, LEF/DEF/GDSII cell libraries, SPICE model cards) or customer RTL to unauthorized external AI endpoints.
4. **Least Mutating Change (Ponytail Ladder)**: Suggest surgical RTL, SDC, or testbench diffs. Avoid sweeping refactors during tape-out or sign-off closure.
5. **Human Gate Required**: Production sign-off tape-out, irreversible mask generation, bitstream flashing to hardware, and license queue batch submittals require explicit user confirmation.

---

## 2. V5.0 Advanced Engineering Capability Groups (100 New Capabilities)

The platform incorporates 100 V5.0 capabilities organized into 10 explicit groups under `modules/v5/`:

| Group | Focus Domain | Key Capabilities | Implementation File |
| :--- | :--- | :--- | :--- |
| **1** | **Chiplet & Advanced Packaging** | UCIe 1.1/2.0 protocol validation, D2D interconnect router, microbump pitch checker, interposer warpage predictor, TSV stress analysis, multi-die PDN co-optimizer | `modules/v5/chiplet-pkg/v5_chiplet_arch.js` |
| **2** | **CPU, GPU, NPU & Accelerator** | RISC-V custom ISA synthesizer, OoO ROB scheduler auditor, branch predictor accuracy & aliasing, MESI coherence verifier, SIMT warp divergence, Tensor GEMM unit evaluator | `modules/v5/chiplet-pkg/v5_chiplet_arch.js` |
| **3** | **High-Speed Interfaces & SI** | PCIe Gen 6/7 PAM4 eye analyzer, SerDes CTLE/DFE adaptive equalizer, S-parameter causality/passivity checker, jitter decomposition, DDR5/LPDDR5X margining, HBM3e interposer loss | `modules/v5/hs-interfaces/v5_hs_thermal.js` |
| **4** | **Thermal, Reliability & Aging** | Full-chip transient thermal hotspots, Black equation EM/SHE sign-off, BTI Vth degradation, HCI predictor, TDDB oxide breakdown, neutron SER FIT, AEC-Q100 Grade 0-3 validation | `modules/v5/hs-interfaces/v5_hs_thermal.js` |
| **5** | **Emulation & Hardware Validation** | Multi-FPGA partitioning, SCE-MI hybrid co-emulation, ICE speedbridge configurator, TDM cable latency optimizer, dynamic ILA probing, post-silicon JTAG scan dump analyzer | `modules/v5/emu-fpga/v5_emu_ai_eda.js` |
| **6** | **AI-Assisted EDA & Research** | DRL macro placer, GNN congestion estimator, LLM Verilog bug localizer & auto-patcher, transfer learning post-route timing metamodeling, PINN IR-drop estimator | `modules/v5/emu-fpga/v5_emu_ai_eda.js` |
| **7** | **Design Data & IP Lifecycle** | IP-XACT IEEE 1685-2022 component packaging, RTL semantic breaking change detector, automated ECO netlist patcher, zero-trust HMAC IP watermarking, OASIS cryptographic seal | `modules/v5/data-ip/v5_data_silicon.js` |
| **8** | **Silicon Validation & Test** | Automated V-F-T Shmoo plot characterization, ATE STDF data parser, scan callout defect localization, SPC Cp/Cpk yield sentinel (>1.33), wafer probe map spatial clustering | `modules/v5/data-ip/v5_data_silicon.js` |
| **9** | **HW/SW Co-Design** | SystemC TLM-2.0 transaction router, CSR C/SystemVerilog synchronizer, bare-metal HAL generator, Gem5 trace correlation, secure boot RoT cryptographic handshake | `modules/v5/sys-codesign/v5_sys_release.js` |
| **10** | **Autonomous QA & Release** | Spec-to-verification traceability matrix, static diagnostic deduplicator, simulation regression delta comparator, surgical test impact selector, production tapeout gate arbiter | `modules/v5/sys-codesign/v5_sys_release.js` |

---

## 3. V4.0 Architecture & Capability Groups (100 Capabilities)

The platform incorporates 100 V4.0 capabilities organized into 10 explicit groups under `modules/v4/`:

| Group | Focus Domain | Key Capabilities | Implementation File |
| :--- | :--- | :--- | :--- |
| **A** | **Requirements & Specification** | Ambiguity detection, completeness scoring, change tracking, criteria generation, conflict resolution | `modules/v4/req-spec/v4_core_intelligence.js` |
| **B** | **RTL Quality & Standards** | Coding standards linter, latch inference detector, assignment auditor, width/signedness analyzer | `modules/v4/req-spec/v4_core_intelligence.js` |
| **C** | **Verification Planning** | Plan coverage mapper, scenario combinator, boundary vectors, temporal sequences, constraint advisor | `modules/v4/verif-planning/v4_verif_debug.js` |
| **D** | **Simulation, Waveforms & Debug** | Capability profiler, config validator, compile error taxonomy, exit-code classifier, timeline correlator | `modules/v4/verif-planning/v4_verif_debug.js` |
| **E** | **Timing & Optimization** | SDC coverage audit, clock consistency, exception review, path classifier, violation trend analyzer | `modules/v4/timing-opt/v4_timing_eda_ops.js` |
| **F** | **EDA Ops & Infrastructure** | Environment fingerprinter, version matrix, license mapper, compute estimator, NFS health checker | `modules/v4/timing-opt/v4_timing_eda_ops.js` |
| **G** | **Security & IP Protection** | Least-privilege enforcer, command allowlist, sensitive RTL scanner, IP boundary validator | `modules/v4/sec-gov/v4_sec_mcp.js` |
| **H** | **MCP & Collaboration** | Protocol negotiator, manifest generator, input sanitizer, output provenance, loop guard | `modules/v4/sec-gov/v4_sec_mcp.js` |
| **I** | **Data & Analytics** | Dataset validator, report normalizer, historical trends, KPI registry, outlier explainer, citations | `modules/v4/data-analytics/v4_data_testing.js` |
| **J** | **Testing & Release** | Test impact prioritization, smoke profile manager, unit-to-smoke trace, RC validator, quarantine | `modules/v4/data-analytics/v4_data_testing.js` |

---

## 3. V3.0 Enterprise Architecture Modules (50 Capabilities)
| **Module A: Design Architecture & IP** | `DesignArchitectureModule` | 1. Specification Compiler<br/>2. Interface Contract Checker<br/>3. IP Reuse Advisor<br/>4. Parameterized RTL Validator<br/>5. Register Map Generator<br/>6. Memory Architecture Advisor<br/>7. Bus Protocol Compliance<br/>8. Clock/Reset Reviewer<br/>9. Complexity Estimator<br/>10. ADR Generator | [`modules/v3/design-architecture/design_architecture.js`](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/modules/v3/design-architecture/design_architecture.js) |
| **Module B: Formal Verification & Debug** | `FormalDebugModule` | 11. Formal Property Assistant<br/>12. Counterexample Interpreter<br/>13. Equivalence Checking<br/>14. Deadlock/Livelock Analyzer<br/>15. X-Propagation Analyzer<br/>16. Reset Sequence Validator<br/>17. Protocol Deadlock Detector<br/>18. Assertion Quality Analyzer<br/>19. Formal Coverage Advisor<br/>20. Debug Reproducer | [`modules/v3/formal-debug/formal_debug.js`](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/modules/v3/formal-debug/formal_debug.js) |
| **Module C: Change & Reliability** | `ChangeReliabilityModule` | 21. Change Impact Analyzer<br/>22. ECO Planning Assistant<br/>23. Patch Risk Scorer<br/>24. Golden Baseline Manager<br/>25. Config Matrix Tester<br/>26. Build Dependency Checker<br/>27. Reproducibility Auditor<br/>28. Artifact Integrity Verifier<br/>29. Engineering Review Assistant<br/>30. Rollback Planner | [`modules/v3/change-reliability/change_reliability.js`](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/modules/v3/change-reliability/change_reliability.js) |
| **Module D: Power, DFT & Physical** | `PowerPhysicalModule` | 31. Power Intent Reviewer<br/>32. Low-Power Verification Planner<br/>33. IR-Drop Report Assistant<br/>34. Electromigration Analyzer<br/>35. Clock Tree Quality Reviewer<br/>36. Parasitic Consistency Checker<br/>37. Scan Architecture Reviewer<br/>38. ATPG Result Analyzer<br/>39. Silicon Bring-up Planner<br/>40. Yield Data Assistant | [`modules/v3/power-physical/power_physical.js`](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/modules/v3/power-physical/power_physical.js) |
| **Module E: Testing & Quality** | `TestingQualityModule` | 41. Skill Contract Test Suite<br/>42. Schema Compatibility Tester<br/>43. Mock EDA Simulator<br/>44. Parser Fuzz Testing<br/>45. Property-Based Testing<br/>46. Golden-File Regression Tests<br/>47. Fault-Injection Harness<br/>48. Security Regression Tests<br/>49. CI Quality Gate<br/>50. Mutation Score Engine | [`modules/v3/testing-quality/testing_quality.js`](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/modules/v3/testing-quality/testing_quality.js) |

*Full traceability, implementation status, and acceptance criteria for all 50 V3 capabilities are documented in [FEATURE_MATRIX_V3.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/FEATURE_MATRIX_V3.md).*

---

## 3. Domain Routing & Reference Map

| Engineering Domain | Scope & Workflows | Reference File |
| :--- | :--- | :--- |
| **Feature Matrix V3.0** | 50 V3 capabilities mapped to modules, files, tests & criteria | [FEATURE_MATRIX_V3.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/FEATURE_MATRIX_V3.md) |
| **Upgrade Audit V3.0** | Environment findings, gap analysis & architectural inventory | [UPGRADE_AUDIT.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/UPGRADE_AUDIT.md) |
| **Test Plan V3.0** | Complete test methodology, categories, and test structure | [TEST_PLAN_V3.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/TEST_PLAN_V3.md) |
| **Test Report V3.0** | Verified test execution evidence (68/68 unit tests passed) | [TEST_REPORT_V3.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/TEST_REPORT_V3.md) |
| **Security Test Report** | CWE-22 Path Traversal & CWE-78 Command Injection verification | [SECURITY_TEST_REPORT.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/SECURITY_TEST_REPORT.md) |
| **Coverage Report** | 97.5% estimated line coverage and 85% mutation test rating | [COVERAGE_REPORT.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/COVERAGE_REPORT.md) |
| **50 Frontier Features (98–147)** | Photonics CPO, Cryo-CMOS, Space Rad-Hard, Sub-2nm GAA/CFET, GaN/SiC | [references/features/expansion_100/50-frontier-features-spec.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/references/features/expansion_100/50-frontier-features-spec.md) |
| **50 Next-Gen Features (48–97)** | Chiplet/UCIe, 3D-IC TSV, Hardware Security/DPA, ISO 26262 FuSa, RISC-V | [references/features/expansion_50/50-features-spec.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/references/features/expansion_50/50-features-spec.md) |
| **30 Advanced Features (18–47)** | Advanced CDC, AXI4 generator, UVM RAL, SVA formal prover, UPF linter | [references/features/30-features-spec.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/references/features/30-features-spec.md) |
| **Architecture & Core** | Copilot subsystem architecture, tool layers, safety boundaries | [references/architecture.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/references/architecture.md) |
| **Digital RTL Design** | Verilog/SystemVerilog, FSMs, CDC (2-FF, MUX-recirc, async FIFO), resets | [references/rtl-design.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/references/rtl-design.md) |
| **Design Verification** | UVM (Agent, Driver, Monitor, Scoreboard, Env), SVA assertions, Coverage | [references/design-verification.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/references/design-verification.md) |
| **Synthesis & STA** | Synopsys DC, PrimeTime, Genus, Tempus, Yosys, SDC constraints, Slacks | [references/synthesis-sta.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/references/synthesis-sta.md) |
| **Physical Design** | Innovus, IC Compiler II, OpenROAD, Floorplan, Placement, CTS, DRC/LVS | [references/physical-design.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/references/physical-design.md) |
| **Analog & Mixed-Signal** | Virtuoso, Spectre, Ngspice, SPICE netlists, OP, AC, TRAN, Noise, Monte Carlo | [references/analog-mixed-signal.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/references/analog-mixed-signal.md) |
| **FPGA Design** | AMD Vivado, Intel Quartus, synthesis, implementation, ILA/SignalTap debug | [references/fpga-design.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/references/fpga-design.md) |
| **DFT & Sign-off** | Scan insertion, ATPG, MBIST, Boundary Scan (IEEE 1149.1), Sign-off checks | [references/dft-signoff.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/references/dft-signoff.md) |
| **MCP Integration** | 147 MCP tool contracts, stdio servers, fallback CLI/Tcl pipelines, vendor APIs | [references/mcp-integration.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/references/mcp-integration.md) |
| **Security & Safety** | License compliance, PDK confidentiality, untrusted log defense, audit logging | [references/security.md](file:///c:/Users/Hoang/Desktop/Skill%20Semiconductor/semiconductor-engineering-copilot/references/security.md) |

---

## 4. Verification Proof & Quality Gates

Run all regression suites across V1, V2, and V3:
```powershell
# 1. Full 147-tool EDA contract regression suite
node semiconductor-engineering-copilot/tests/run_tests.js

# 2. V2.0 50-feature platform architecture suite
node semiconductor-engineering-copilot/tests/v2/run_v2_tests.js

# 3. V3.0 50-capability Unit Test Suite (68 tests)
node semiconductor-engineering-copilot/tests/unit/run_all_v3_tests.js

# 4. Structural skill integrity and schema validation
node semiconductor-engineering-copilot/scripts/validate_skill.js
```
