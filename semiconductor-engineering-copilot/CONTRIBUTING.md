# Contributing to Semiconductor Engineering Copilot ⚡

Welcome! We are building the world's most rigorous, open-source, AI-powered semiconductor engineering platform. Whether you are a silicon verification engineer, an analog/digital designer, an EDA developer, an academic researcher, or a student passionate about microelectronics, your contributions are invaluable.

---

## 🌟 Table of Contents
1. [Our Philosophy & Core Principles](#-our-philosophy--core-principles)
2. [Ways to Contribute](#-ways-to-contribute)
3. [Quickstart Development Setup](#-quickstart-development-setup)
4. [Contribution Workflow (Step-by-Step)](#-contribution-workflow-step-by-step)
5. [Code & Verification Standards](#-code--verification-standards)
6. [Roadmap & High-Priority Areas](#-roadmap--high-priority-areas)
7. [Community & Recognition](#-community--recognition)

---

## 🧭 Our Philosophy & Core Principles

All contributions must adhere to our **Triad Engineering Rules**:
1. **Zero Hallucination & Verifiable Evidence**: Never commit a mock or simulated output without real parsing. All tool assertions, timing checks, and DRC reports must parse real stdout/exit-codes or mathematically sound models.
2. **Ponytail Minimalist Architecture**: Prefer minimal viable code diffs. Solve problems in stdlib before adding dependencies. Keep functions $\le$ 40 LOC and files $\le$ 400 LOC.
3. **PDK & IP Confidentiality**: Never commit proprietary foundry PDK files (TSMC, Samsung, Intel, GlobalFoundries), proprietary IP-XACT files, or NDA-governed GDSII. Target open PDKs (SkyWater 130nm, IHP 130nm, FreePDK45) and open EDA toolchains (Yosys, OpenROAD, Icarus, Verilator).

---

## 🚀 Ways to Contribute

You do not need 20 years of VLSI experience to contribute! We have high-leverage entry points for all skill levels:

| Tier | Type | Examples | Good For |
| :--- | :--- | :--- | :--- |
| **Tier 1: Beginner** | Documentation & Examples | Add OpenROAD / Yosys tutorials, translate docs, fix typos | First-time contributors |
| **Tier 2: Intermediate** | Testbenches & RTL Benchmarks | Add Verilog/SystemVerilog fixtures, UVM tests, RISC-V assembly tests | Hardware students & engineers |
| **Tier 3: Advanced** | EDA Adapters & Parsers | Add parser for GDSII stream, VCD trace reader, S-parameter viewer | Software & EDA developers |
| **Tier 4: Expert** | Chiplet & Packaging Models | Expand UCIe 2.0 D2D protocol models, thermal aging solvers, SI PAM4 eye diagrams | Domain experts & researchers |

---

## 🛠️ Quickstart Development Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **Git**: Latest version
- *(Optional)* Open-Source EDA tools: `yosys`, `iverilog`, `verilator`, `openroad`

### 2. Fork & Clone
```bash
git clone https://github.com/<your-username>/semiconductor-engineering-copilot.git
cd semiconductor-engineering-copilot
```

### 3. Verify the Test Suite
Ensure all 364+ tests pass cleanly out of the box:
```bash
# Run the complete test suite
npm run test:all

# Or run specific test tiers
npm run test:v5       # V5 capability tests
npm run test:smoke    # Smoke validation
npm run test:e2e      # End-to-end integration
```

---

## 🔄 Contribution Workflow (Step-by-Step)

1. **Pick or File an Issue**: Check [GitHub Issues](https://github.com/your-org/semiconductor-engineering-copilot/issues) with the `good first issue` or `help wanted` tags.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feat/add-yosys-json-netlist-parser
   ```
3. **Implement Surgically**: Keep changes atomic. Follow existing directory conventions under `modules/` or `adapters/`.
4. **Add Unit / Integration Tests**: Every new capability must include automated test coverage in `tests/`.
5. **Commit with Conventional Commits**:
   ```bash
   git commit -m "feat(eda): add Yosys JSON netlist cell hierarchy parser"
   ```
   *Allowed prefixes: `feat`, `fix`, `docs`, `test`, `refactor`, `perf`, `chore`.*
6. **Open a Pull Request**: Fill out the PR template completely and link the related issue.

---

## 📐 Code & Verification Standards

- **Strict Preservation**: Never delete or rewrite existing functional logic outside the scope of your PR.
- **Zero Heavy Dependencies**: Avoid npm dependencies for simple string parsing or math. Use native Node.js capabilities.
- **Deterministic Tests**: Do not use `setTimeout` or arbitrary sleep calls in tests. Use deterministic event callbacks and assertions.
- **Linting & Formatting**: Ensure clean ES6+ JavaScript, well-commented exports, and descriptive error messages.

---

## 🗺️ Roadmap & High-Priority Areas

We actively welcome contributions in these domains:
- [ ] **Open PDK Integration**: Pre-configured templates for SkyWater 130nm and GF180MCU.
- [ ] **Waveform Viewer**: Fast terminal-based ASCII/SVG VCD waveform renderer.
- [ ] **RISC-V Extensions**: Vector (RVV) and Cryptography (RVK) instruction set auditor.
- [ ] **Wasm EDA Bridge**: Running lightweight synthesis or simulation directly in Node.js via WebAssembly.
- [ ] **CI/CD Actions**: GitHub Actions workflows for continuous automated RTL linting.
- [ ] **Enterprise Apex Modules**: Expand on any of the 30 capabilities outlined in [ENTERPRISE_APEX_30.md](ENTERPRISE_APEX_30.md).

---

## 🎯 How to Claim an Issue

1. Browse issues tagged [`good first issue`](https://github.com/your-username/semiconductor-engineering-copilot/issues?q=is%3Aissue+is%3Aopen+label%3A"good+first+issue") or [`help wanted`](https://github.com/your-username/semiconductor-engineering-copilot/issues?q=is%3Aissue+is%3Aopen+label%3A"help+wanted").
2. Leave a comment: *"I'd like to work on this!"*
3. A maintainer will assign the issue to you within 24 hours.
4. If you need assistance with EDA tools, ask questions directly in the issue thread or GitHub Discussions.

---

## 🤝 Community & Recognition

- **All Contributors**: Every merged PR automatically adds your avatar to our README Contributor Wall via the `@all-contributors` bot.
- **Discussion & Help**: Join our GitHub Discussions to ask design questions, propose RFCs, or brainstorm new features.
- **Code of Conduct**: Treat every contributor with respect and professionalism. We are here to learn and build together.

*Thank you for helping democratize silicon engineering for the world!* 🚀

