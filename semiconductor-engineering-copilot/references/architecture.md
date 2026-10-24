# Semiconductor Engineering Copilot Architecture

The **semiconductor-engineering-copilot** is architected to provide safe, deterministic, evidence-backed AI assistance across the entire ASIC/SoC and FPGA development cycle.

```
+-------------------------------------------------------------------------+
|                         AI Coding Agent Layer                           |
|       (Antigravity / Claude Code / Cursor / Windsurf / Copilot)         |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                  Core Skill Layer (SKILL.md)                            |
|       - Domain Routing Rules      - 7-Phase Engineering Workflow        |
|       - Tool Discovery Triggers   - Security & Safe Approval Gate       |
+-------------------------------------------------------------------------+
                                    |
            +-----------------------+-----------------------+
            |                                               |
            v                                               v
+-----------------------+                       +-----------------------+
|  Domain References    |                       | Execution Adapters    |
| (references/*.md)     |                       | (adapters/*)          |
| - RTL Design          |                       | - Tier 1: MCP Server  |
| - Verification & UVM  |                       | - Tier 2: Tcl / Batch |
| - STA / Synthesis     |                       | - Tier 3: Open EDA    |
| - Physical / Analog   |                       +-----------------------+
+-----------------------+                                   |
                                                            v
+-------------------------------------------------------------------------+
|                          Host EDA Toolchain                             |
|  Commercial (VCS, Questa, DC, PT, Innovus, Vivado, Spectre)             |
|  Open-Source (Icarus, Verilator, Yosys, OpenROAD, Ngspice, GTKWave)     |
+-------------------------------------------------------------------------+
```

## Layered Subsystems

### 1. AI Agent Layer
Accepts engineer prompts and commands, parses intent, and loads domain-specific reference contexts strictly on demand to minimize context bloat.

### 2. Core Skill Engine
Maintains the 7-phase state machine (Understand -> Plan -> Execute -> Analyze -> Improve -> Validate -> Report), enforces strict verification rules, and prevents hallucinations.

### 3. Tool Execution & Adapter Layer
Decouples prompt generation from physical execution:
- **MCP Adapter (`adapters/mcp/`)**: Native JSON-RPC stdio server exposing 17 structured tool contracts.
- **Tcl Scripting (`adapters/tcl/`)**: Parametric headless scripts for PrimeTime, Design Compiler, Innovus, and Vivado.
- **Generic CLI & Log Parsers (`adapters/generic-cli/`)**: Regular-expression log analyzers converting raw simulator stdout into structured JSON metrics (WNS, TNS, UVM_ERROR count, DRC counts).

### 4. Safety & Security Boundary
- Sandboxed working directories for compilation runs (`.sim_build/`, `.synth_build/`).
- Bounded execution timeouts (300s default for simulation/STA).
- Zero transmission of confidential PDK / LEF / GDSII / proprietary RTL artifacts to third-party APIs.
