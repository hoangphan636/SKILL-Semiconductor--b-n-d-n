# 🗺️ Product & Engineering Roadmap (2026 - 2027)

Our mission is to establish the world's most accessible, verified, and high-performance open-source AI platform for silicon design, chiplet integration, and EDA workflows.

---

## 🎯 Active Milestones & Contributor Opportunities

```
  Q1 2026                     Q2 2026                     Q3 2026                     Q4 2026
┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
│ • V5.0 Core Release     │ │ • Open PDK Sky130/GF180 │ │ • UCIe 2.0 Streaming    │ │ • Silicon Bring-up ATE  │
│ • MCP stdio Protocol    │ │ • WebAssembly EDA Run   │ │ • 3D Interposer Stress  │ │ • Autonomous Tape-out   │
│ • 447 Capabilities     │ │ • RISC-V Vector (RVV)   │ │ • GNN Congestion V2     │ │ • Multi-Agent Sign-off  │
└─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘
```

### Phase 1: Democratizing Open EDA (Current - Q2 2026)
*Goal: Enable every student and engineer to simulate, synthesize, and route designs without commercial licenses.*
- [x] Baseline simulation runner for Icarus Verilog and Verilator
- [x] Yosys synthesis gate-level netlist parser
- [ ] **Open PDK Integration**: End-to-end flow templates for SkyWater 130nm (`sky130`) and GlobalFoundries 180MCU (`gf180mcu`) — *(Open for Contribution)*
- [ ] **Browser-Based Wasm EDA**: Run lightweight linting and logic synthesis directly in the browser via WebAssembly — *(Open for Contribution)*
- [ ] **Interactive Waveform Visualizer**: Terminal-based and SVG-based VCD/FST waveform rendering — *(Open for Contribution)*

### Phase 2: Advanced Packaging & Heterogeneous Chiplets (Q2 - Q3 2026)
*Goal: Frontier multi-die 2.5D/3D packaging and high-speed signal integrity.*
- [x] UCIe 1.1 / 2.0 D2D protocol state machine validator
- [x] PCIe Gen 6/7 PAM4 eye height / width margin analyzer
- [ ] **HBM3e / HBM4 Substrate Warpage & Thermal Solver**: Multi-physics finite-element proxy — *(Research Collab)*
- [ ] **TSV Stress & EM Hotspot Mapper**: 3D-IC through-silicon via failure prediction — *(Open for Contribution)*

### Phase 3: Processor Architecture & AI Hardware (Q3 - Q4 2026)
*Goal: Next-generation compute cores and domain-specific accelerators.*
- [x] RISC-V RV32I / RV64G custom instruction synthesizer
- [x] Out-of-Order ROB scheduler dependency analysis
- [ ] **RISC-V Vector (RVV 1.0) & Matrix Extensions (Zacas, Zfinx)**: Assembly validator — *(Open for Contribution)*
- [ ] **Systolic Array GEMM Profiler**: Cycle-accurate utilization calculator for NPU/TPU architectures — *(Open for Contribution)*

### Phase 4: Production Bring-Up & Autonomous Sign-off (2027)
*Goal: Zero-defect production tape-out consensus.*
- [x] ATE STDF test data parser & Shmoo plot characterization
- [x] Multi-agent tape-out sign-off consensus arbiter
- [ ] **Hardware-in-the-Loop JTAG Bridge**: Direct hardware bring-up via FTDI / Raspberry Pi debug probes — *(Research Collab)*

---

## 🙋 Want to Lead a Feature?
If you want to spearhead any unchecked roadmap item above, comment on the corresponding issue in [GitHub Issues](https://github.com/your-org/semiconductor-engineering-copilot/issues) or submit an RFC proposal!
