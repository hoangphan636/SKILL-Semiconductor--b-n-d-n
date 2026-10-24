# Synthesis and Static Timing Analysis (STA)

## 1. Synthesis Engines & Flows
- **Synopsys Design Compiler (DC)**:
  - Invocation: `dc_shell -f synth.tcl | tee synth.log`
  - Core stages: Elaboration (`elaborate`), compile/compile_ultra, boundary optimization, mapping to target standard cell library (`.db`).
- **Cadence Genus**:
  - Invocation: `genus -f run_synth.tcl -batch`
  - Features: Synthesizes directly with physically aware wire-load models and early placement.
- **Yosys (Open Source)**:
  - Invocation: `yosys -p "read_verilog -sv rtl/*.sv; synth -top top_mod; write_verilog synth_netlist.v"`

## 2. Static Timing Analysis (STA) Principles
- **Timing Equations**:
  - **Setup Check (Max Delay)**:
    $$T_{launch} + T_{cq} + T_{data\_max} \le T_{capture} + T_{cycle} - T_{setup} - T_{skew} - T_{uncertainty}$$
    $$\text{Slack}_{setup} = (T_{required} - T_{arrival}) \ge 0$$
  - **Hold Check (Min Delay)**:
    $$T_{launch} + T_{cq} + T_{data\_min} \ge T_{capture} + T_{hold} + T_{skew} + T_{uncertainty}$$
    $$\text{Slack}_{hold} = (T_{arrival} - T_{required}) \ge 0$$
- **Metrics**:
  - **WNS (Worst Negative Slack)**: Margin of the most violating path in a clock domain (must be >= 0.000 for closure).
  - **TNS (Total Negative Slack)**: Sum of negative slack across all failing endpoints (must be 0.000 for closure).
  - **WHS / THS**: Worst Hold Slack / Total Hold Slack.

## 3. Synopsys Design Constraints (SDC) Standards
- **Clock Definition**: `create_clock -name VCLK -period 5.0 [get_ports clk_core]`
- **Generated Clocks**: `create_generated_clock -name CLK_DIV2 -source [get_ports clk_core] -divide_by 2 [get_pins div_reg/Q]`
- **IO Constraints**: `set_input_delay -clock VCLK -max 1.5 [get_ports din*]`, `set_output_delay -clock VCLK -max 1.0 [get_ports dout*]`
- **False Paths & Clock Groups**:
  - Asynchronous domains: `set_clock_groups -asynchronous -group {CLK_A} -group {CLK_B}`
  - Static mode registers: `set_false_path -from [get_ports test_mode]`

## 4. Timing Violation Triage & Fixes
- **Setup Violations**:
  - Root Cause: Combinational logic path too deep, high fanout nets, excessive wire delay.
  - Fixes: Insert pipeline stage, balance logic cones, restructure arithmetic operators, upsize drive strength buffers, reduce clock frequency.
- **Hold Violations**:
  - Root Cause: Clock skew (capture clock arrives later than launch) or fast data path.
  - Fixes: Insert delay buffers on data path (done during physical design/CTS). Never fix hold by increasing clock period!
