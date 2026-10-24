# Semiconductor Copilot Execution Adapters

This directory provides execution adapters connecting the AI Agent with EDA tools across different interface tiers:

## Adapter Directory Structure

- `generic-cli/`: CLI adapters and log parsers for simulation stdout and timing reports.
- `tcl/`: Parametric Tcl automation scripts for Synopsys PrimeTime, Design Compiler, Cadence Innovus, and AMD Vivado.
- `python/`: High-level Python wrappers for EDA workflow orchestration.
- `mcp/`: Native JSON-RPC stdio MCP servers exposing the 17 standardized EDA tool contracts.

## Interface Tier Strategy

1. **Tier 1 (MCP Native)**: When an active EDA MCP server is configured in the agent environment, dispatch structured JSON-RPC calls.
2. **Tier 2 (Batch CLI & Headless Tcl)**: When commercial tools are installed on Linux/WSL2 hosts without MCP servers, dispatch scripted headless commands via `tcl/` or `generic-cli/`.
3. **Tier 3 (Open-Source Fallback)**: For local lightweight verification when commercial licenses are absent, invoke Icarus Verilog, Yosys, Verilator, or Ngspice.
