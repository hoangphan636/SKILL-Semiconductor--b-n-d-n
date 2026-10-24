# 30 Advanced Features Specification: Semiconductor Engineering Copilot

A comprehensive expansion adding 30 specialized features across the entire IC design lifecycle.

---

## Group 1: Advanced RTL & Architecture Automation (Features 1-6)

### 1. `cdc_lint_analyzer` (Clock Domain Crossing & RDC Linting)
- **Scope**: Structural CDC & Reset Domain Crossing (RDC) rule checking.
- **Capabilities**: Detects unsynchronized CDC paths, multi-bit bus synchronization errors, reconvergence of synchronized signals, glitch risks on asynchronous resets, and missing reset de-assertion synchronizers.
- **Tools**: Compatible with Synopsys SpyGlass CDC, Questa CDC, and BluePearl.

### 2. `axi_packet_generator` (AXI4/AXI4-Lite Protocol Interconnect Verification)
- **Scope**: AMBA AXI4, AXI4-Lite, and AXI-Stream interface automation.
- **Capabilities**: Scaffolds burst transactions, unaligned transfer handlers, out-of-order response verification, and concurrent read/write channel arbitration assertions.
- **Protocol Checks**: Zero handshake deadlock (never wait for `READY` before asserting `VALID`), boundary 4KB crossing check.

### 3. `fsm_optimizer_checker` (FSM Safe State & Glitch-Free Encoding)
- **Scope**: FSM formal verification & safe state synthesis.
- **Capabilities**: Detects unreachable states, deadlocks, missing default branches, and converts between Gray, One-Hot, and Binary encodings for area/speed/fault-tolerance trade-offs (Hamming distance protection for radiation-hardened designs).

### 4. `memory_bist_wrapper_gen` (Embedded SRAM Memory BIST Integration)
- **Scope**: Memory test collar automation.
- **Capabilities**: Wraps single-port and dual-port SRAM macros with March-C+ algorithm test controllers, collar muxing between functional and BIST modes, and retention test modes.

### 5. `clock_gating_optimizer` (Dynamic Power Reduction via ICG Insertion)
- **Scope**: Integrated Clock Gating (ICG) cell insertion at RTL level.
- **Capabilities**: Automatically identifies registers with feedback enable conditions (`if (en) q <= d; else q <= q;`) and refactors them into ICG constructs (`CKLNQD` / latch-based clock gates) to minimize dynamic switching power.

### 6. `register_slice_generator` (Decoupled Pipeline Handshake Regslice)
- **Scope**: Timing closure across long physical interconnects.
- **Capabilities**: Generates Forward, Backward, and Full 2-depth skid buffers (register slices) for ready/valid protocols to break combinational timing paths with zero throughput loss (1 transfer/cycle).

---

## Group 2: Advanced Verification & UVM Automation (Features 7-12)

### 7. `uvm_ral_model_gen` (Register Abstraction Layer Generation)
- **Scope**: UVM RAL (`uvm_reg_block`, `uvm_reg`, `uvm_reg_field`) generation from IP-XACT / CSV / JSON address maps.
- **Capabilities**: Generates register blocks with read-only, write-only, read/write, write-1-to-clear (`W1C`) attributes, frontdoor/backdoor access adapters, and built-in reset/bit-bash sequences.

### 8. `formal_property_prover` (SystemVerilog Assertions & Formal Verification)
- **Scope**: Bounded model checking (BMC) and formal equivalence.
- **Capabilities**: Formulates mutual exclusion (`$onehot0`), stability under backpressure (`req && !gnt |=> req`), and bounded liveness properties. Emits Tcl scripts for JasperGold / VC Formal.

### 9. `functional_coverage_matrix_builder` (Coverage Closure Matrix)
- **Scope**: Traceability from requirements to covergroups.
- **Capabilities**: Crosses configuration modes with transfer sizes, illegal conditions, and protocol corner cases. Generates SystemVerilog `covergroup` code with customized `bins` and `illegal_bins`.

### 10. `flaky_test_triage` (Regression Failure Clustering & Random Seed Analysis)
- **Scope**: Regression debug optimization.
- **Capabilities**: Analyzes regression logs across hundreds of random seeds, cluster failures by error signature, identifies seed sensitivity, and flags race conditions caused by non-deterministic event queue ordering (`#0` delays, delta-cycle hazards).

### 11. `dpi_c_virtual_subsystem` (SystemVerilog DPI-C Co-Simulation)
- **Scope**: Golden software reference models.
- **Capabilities**: Generates SystemVerilog `import "DPI-C"` / `export "DPI-C"` interfaces, C/C++ memory wrappers, and data conversion structs for algorithmic models (AES, FFT, DSP filters).

### 12. `waveform_event_trigger_search` (Headless Waveform Anomaly Detection)
- **Scope**: Fast debug without GUI overhead.
- **Capabilities**: Headless search through multi-gigabyte VCD/FST dumps for specific transition states (e.g., `ack` asserting without `req`, bus float `Z` or `X` propagation) and outputs timestamp bookmarks.

---

## Group 3: Synthesis, Constraints & Advanced STA (Features 13-18)

### 13. `sdc_constraint_validator` (SDC Linting & Multi-Clock Interaction)
- **Scope**: SDC/XDC constraint quality check.
- **Capabilities**: Detects unconstrained ports, unconstrained register endpoints, missing clock latency, conflicting `set_false_path` vs `set_max_delay`, and improper `-asynchronous` clock group groupings.

### 14. `multicycle_path_analyzer` (MCP Verification & Setup/Hold Multiplier)
- **Scope**: Validating multi-cycle path exceptions.
- **Capabilities**: Verifies that paths constrained with `set_multicycle_path -setup N` have a matching `set_multicycle_path -hold N-1` and that enable logic mathematically guarantees data arrives only every N clock cycles.

### 15. `ocv_pocv_margin_auditor` (On-Chip Variation & Derate Modeling)
- **Scope**: Advanced statistical timing analysis (POCV / AOCV).
- **Capabilities**: Evaluates flat derating vs statistical sigma-based timing derates (`set_timing_derate`), verifying clock path pessimism removal (CPPR/CRPR) across advanced FinFET/GAA nodes (7nm, 5nm, 3nm).

### 16. `power_grid_ir_drop_evaluator` (Static/Dynamic IR Drop & EM Estimation)
- **Scope**: Power distribution network (PDN) integrity.
- **Capabilities**: Parses Voltus / RedHawk summary reports, flags excessive IR drop on standard cell power rails, and detects Electromigration (EM) violations on high-switching metal layers.

### 17. `upf_low_power_intent_linter` (UPF 3.0 / CPF Multi-Voltage Power Management)
- **Scope**: Unified Power Format (IEEE 1801) checking.
- **Capabilities**: Verifies power domains, isolation cell insertion (`set_isolation`), level shifters (`set_level_shifter`) across voltage boundaries, retention registers, and power switch state tables (PST).

### 18. `glitch_and_metastability_window_calc` (MTBF Calculation for CDC Synchronizers)
- **Scope**: Reliability calculations for mission-critical designs.
- **Capabilities**: Computes Mean Time Between Failures (MTBF) using foundry flip-flop parameters ($C_1, C_2, \tau$), clock frequency, and asynchronous data arrival rates.

---

## Group 4: Physical Design & Foundry Sign-off (Features 19-24)

### 19. `drc_antenna_violation_repair` (Diode & Metal Jumper Insertion Guidance)
- **Scope**: Process antenna rule violations repair.
- **Capabilities**: Pinpoints long metal runs inducing gate oxide breakdown and recommends diode cell insertion locations or metal layer jumping (routing to higher metal then returning down).

### 20. `macro_placement_congestion_optimizer` (Macro Floorplan & Halos)
- **Scope**: SRAM macro floorplanning.
- **Capabilities**: Analyzes flylines and pin densities between macros and core logic, optimizes placement, and defines placement halos/keep-out regions to prevent channel routing congestion.

### 21. `clock_tree_skew_balancer` (CTS Target Tuning & Latency Balancing)
- **Scope**: Clock Tree Synthesis (Innovus CCOpt / ICC2 CTS).
- **Capabilities**: Tunes target insertion delay, max transition, and max skew constraints; identifies high-skew clock sinks and balances clock domains for inter-clock domain timing closure.

### 22. `lvs_discrepancy_pinpointer` (Netlist vs GDSII Device & Net Discrepancies)
- **Scope**: Calibre/Pegasus LVS debug.
- **Capabilities**: Parses LVS discrepancy reports, matches unmatched layout vs schematic instances, identifies shorted power nets, swapped MOS terminals (drain/source), and floating dummy wells.

### 23. `dummy_metal_fill_density_advisor` (CMP Density Sign-off)
- **Scope**: Chemical-Mechanical Planarization (CMP) sign-off.
- **Capabilities**: Parses layer density maps, detects density violations (< 20% or > 80% metal occupancy), and calculates required dummy metal fill and track exclusion zones.

### 24. `spef_parasitic_net_delay_auditor` (SPEF RC Extraction & Delay Impact)
- **Scope**: Post-layout timing correlation.
- **Capabilities**: Parses Standard Parasitic Exchange Format (SPEF) files, identifies excessive net resistance/capacitance ($C_{total}$, $C_{coupling}$), and correlates pre-layout wireload models against post-route extracted delays.

---

## Group 5: Analog, Mixed-Signal & SPICE (Features 25-27)

### 25. `opamp_stability_analyzer` (AC Phase Margin & Gain Margin Closure)
- **Scope**: Operational Amplifier frequency response.
- **Capabilities**: Parses Spectre/Ngspice `.AC` simulation outputs, identifies unity-gain bandwidth (UGBW), measures phase margin ($PM \ge 60^\circ$) and gain margin ($GM \ge 10\,\text{dB}$), and recommends Miller compensation capacitor sizing.

### 26. `monte_carlo_yield_estimator` (Transistor Mismatch & 3-Sigma Yield)
- **Scope**: PVT and statistical Monte Carlo simulation.
- **Capabilities**: Parses statistical SPICE distributions (threshold voltage $V_{th}$, channel length $L$, oxide thickness $T_{ox}$) and calculates mean, standard deviation ($\sigma$), and projected 3-sigma / 6-sigma yield margins.

### 27. `bandgap_temperature_drift_checker` (Voltage Reference Curvature Correction)
- **Scope**: Precision analog voltage reference design.
- **Capabilities**: Calculates temperature coefficient ($TC = \frac{\Delta V_{ref}}{V_{ref} \times \Delta T} \times 10^6\,\text{ppm/}^\circ\text{C}$) over $-40^\circ\text{C}$ to $125^\circ\text{C}$ and optimizes PTAT / CTAT resistor balancing.

---

## Group 6: FPGA, Emulation & Ecosystem (Features 28-30)

### 28. `bram_dsp_inference_auditor` (FPGA Primitive Inference Verification)
- **Scope**: AMD Vivado / Intel Quartus synthesis optimization.
- **Capabilities**: Inspects synthesis utilization reports to verify that memory arrays infer dedicated Block RAM / UltraRAM rather than wasting LUTs, and that multiply-accumulate logic infers DSP48/DSP58 slices.

### 29. `ila_debug_core_inserter` (Runtime In-System Logic Analyzer Insertion)
- **Scope**: Vivado hardware debug automation.
- **Capabilities**: Generates non-intrusive Tcl scripts for inserting `ila_v6_2` cores, connecting probe pins to internal bus nets, and generating trigger conditions without modifying RTL source code.

### 30. `ipxact_packaging_automator` (IEEE 1685 Component Metadata Export)
- **Scope**: SoC IP integration and catalog packaging.
- **Capabilities**: Automatically generates IEEE 1685 compliant IP-XACT XML packaging definitions from Verilog module headers and register maps for seamless plug-and-play in Vivado IP Integrator or Synopsys CoreAssembler.
