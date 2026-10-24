# Simulation & Waveform Debugging

## 1. Supported Simulators & Execution Modes

| Simulator | Vendor | Typical CLI Invocation | Headless Batch Flags |
| :--- | :--- | :--- | :--- |
| **VCS** | Synopsys | `vcs -sverilog -full64 [files] -o simv && ./simv` | `-l vcs.log +vcs+lic+wait` |
| **Questa / ModelSim** | Siemens | `vlog [files] && vsim -c top_tb -do "run -all; quit -f"` | `-c -l vsim.log -batch` |
| **Xcelium** | Cadence | `xrun -64bit -sv [files] -top top_tb` | `-batch -logfile xrun.log` |
| **Icarus Verilog** | Open Source | `iverilog -g2012 -o sim.vvp [files] && vvp sim.vvp` | `-l iverilog.log` |
| **Verilator** | Open Source | `verilator --cc --exe --build -Wall sim_main.cpp [files]` | `-j 4` |

## 2. Waveform Formats & Inspection
- **VCD (Value Change Dump - IEEE 1364)**: Universal, human-readable, large disk footprint. Dumped via `$dumpfile("sim.vcd"); $dumpvars(0, tb_top);`.
- **FSDB (Fast Signal Database - Synopsys/Verdi)**: Compressed, highly optimized for large ASIC regressions. Dumped via `$fsdbDumpfile("sim.fsdb"); $fsdbDumpvars(0, tb_top);`.
- **FST (Fast Signal Trace - GTKWave)**: Open compressed format, ~50x smaller than raw VCD.
- **Waveform Inspection Options**:
  - GUI: GTKWave (`gtkwave dump.vcd`), Verdi (`verdi -ssf dump.fsdb`), Surfer (`surfer dump.vcd`).
  - Headless/CLI: Python `vcdvcd`, Rust `wellen`, or Verilator C++ trace analysis.

## 3. Waveform Debugging Methodology
1. **Trigger Identification**: Note exact failure timestamp from simulation log.
2. **Clock & Reset Health**: Confirm clock has expected 50% duty cycle and reset asserted/deasserted without metastability.
3. **Control Handshake Tracing**: Check valid/ready, req/ack, or grant signals leading up to the fault.
4. **Data Corruption Pinpointing**: Track erroneous output backwards through combinatorial logic cones to sequential pipeline registers.
