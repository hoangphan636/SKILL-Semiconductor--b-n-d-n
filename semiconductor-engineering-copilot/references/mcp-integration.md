# MCP Integration Architecture & EDA Tool Contracts

## 1. Integration Status Matrix

| EDA Tool | Vendor | Integration Status | Supported Interface Mechanism | Official MCP Server? |
| :--- | :--- | :--- | :--- | :--- |
| **Icarus Verilog** | Open Source | **Ready / Tested** | CLI / Headless stdio adapter | Community / Custom Adapter |
| **Yosys** | YosysHQ | **Ready / Tested** | CLI / Tcl batch mode | Community / Custom Adapter |
| **OpenROAD** | OpenROAD | **Ready** | Tcl / Python API / CLI | Community / Custom Adapter |
| **Ngspice** | Open Source | **Ready** | Batch CLI mode | Custom Adapter |
| **Synopsys VCS** | Synopsys | **Supported via Batch** | CLI / FlexLM licensed batch | No official vendor MCP |
| **Synopsys DC/PT** | Synopsys | **Supported via Batch** | Tcl (`dc_shell -f`, `pt_shell -f`) | No official vendor MCP |
| **Cadence Xcelium/Innovus** | Cadence | **Supported via Batch** | Tcl / CLI batch mode | No official vendor MCP |
| **Siemens Questa** | Siemens | **Supported via Batch** | CLI / Macro (`vsim -c -do`) | No official vendor MCP |
| **AMD Vivado** | AMD | **Supported via Batch** | Tcl batch mode (`vivado -mode batch`) | Community wrappers |

> [!NOTE]
> Major commercial EDA vendors (Synopsys, Cadence, Siemens) do NOT currently provide publicly certified vendor-supported MCP servers. All interactions must proceed via documented CLI flags, headless Tcl scripts, or custom stdio JSON-RPC adapters conforming to the MCP specification.

---

## 2. Standardized MCP Tool Contracts

The copilot provides 17 discrete logical tool contracts (implemented in `adapters/mcp/eda_mcp_server.js` and `adapters/mcp/eda_mcp_server.py`):

1. `discover_eda_tools`: Probes system path for EDA binaries and returns structured capability manifest.
2. `inspect_project`: Analyzes workspace file tree, detects RTL, testbenches, SDC, and EDA project files.
3. `read_rtl_source`: Safely reads RTL module files with bounded line offsets and symbol indexing.
4. `lint_rtl`: Runs syntax and lint checks on RTL files using available linters (Verilator, slang, Veridian).
5. `elaborate_design`: Performs top-level module elaboration and checks for unresolved module instances or port mismatches.
6. `run_simulation`: Compiles and runs testbench using available simulator (iverilog, verilator, vcs, vsim).
7. `run_regression`: Executes batch test suites across multiple seeds and compiles pass/fail matrix.
8. `inspect_simulation_logs`: Parses simulation logs for UVM_ERROR, UVM_FATAL, assertion failures, and timestamps.
9. `inspect_waveform`: Headless signal value extraction from VCD/FST dumps around designated timestamps.
10. `analyze_coverage`: Parses code and functional coverage databases (UCDB / lcov).
11. `run_synthesis`: Synthesizes RTL to gate-level netlist using target technology or generic gates.
12. `analyze_timing_report`: Parses STA timing reports, extracts WNS, TNS, critical paths, and startpoint/endpoint pairs.
13. `inspect_critical_paths`: Detailed inspection of cell delays, net delays, and transition times along the critical path.
14. `inspect_physical_design_reports`: Parses DRC, LVS, and congestion reports from Innovus/OpenROAD.
15. `generate_testbench`: Generates SystemVerilog/UVM testbench scaffolding for a given RTL interface.
16. `propose_rtl_patch`: Emits surgical unified diff for RTL bug fixes or timing optimizations.
17. `validate_patch`: Re-executes simulation or STA to mathematically verify that the patch fixes the failure without regressions.
