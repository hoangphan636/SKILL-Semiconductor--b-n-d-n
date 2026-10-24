<div align="center">

```
   ███████╗███████╗███╗   ███╗██╗██████╗  █████╗ ███████╗██╗ ██████╗ 
   ██╔════╝██╔════╝████╗ ████║██║██╔══██╗██╔══██╗██╔════╝██║██╔════╝ 
   ███████╗█████╗  ██╔████╔██║██║██████╔╝███████║███████╗██║██║  ███╗
   ╚════██║██╔══╝  ██║╚██╔╝██║██║██╔═══╝ ██╔══██║╚════██║██║██║   ██║
   ███████║███████╗██║ ╚═╝ ██║██║██║     ██║  ██║███████║██║╚██████╔╝
   ╚══════╝╚══════╝╚═╝     ╚═╝╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝ 
```

# ⚡ SEMICONDUCTOR ENGINEERING COPILOT ⚡
### 🌐 Production-Grade Autonomous AI Engineering Architecture for Silicon Design & Sign-off

<p align="center">
  <img src="https://img.shields.io/badge/Platform_Version-V5.0_Production-blue?style=for-the-badge&logo=rocket&logoColor=white" alt="Platform Version" />
  <img src="https://img.shields.io/badge/Total_Capabilities-447_Production_Features-00f2fe?style=for-the-badge&logo=cpu&logoColor=white" alt="Total Capabilities" />
  <img src="https://img.shields.io/badge/Tests_Passing-364%2F364_Clean-00DF89?style=for-the-badge&logo=checkmarx&logoColor=white" alt="Tests Passing" />
  <img src="https://img.shields.io/badge/Packaging-UCIe_1.1%2F2.0_%7C_2.5D%2F3D_Chiplet-7928CA?style=for-the-badge&logo=atom&logoColor=white" alt="Packaging" />
  <img src="https://img.shields.io/badge/Security-Zero_CVE_%7C_Jail_Enforced-FF0080?style=for-the-badge&logo=shield&logoColor=white" alt="Security" />
</p>

<p align="center">
  <b>Architected for Staff Silicon Engineers, Verification Architects, Physical Design Leads & EDA Specialists</b><br/>
  <i>Bridging frontier Foundation Models with mission-critical EDA Toolchains (Synopsys, Cadence, Siemens, OpenROAD, Yosys)</i>
</p>

---

</div>

## 🌌 1. System Vision & The "Zero-Hallucination" Silicon Shield

Modern semiconductor tape-outs cost tens of millions of dollars. A single hallucinated timing slack or missed clock-domain crossing (CDC) glitch results in broken silicon and catastrophic respins. 

**Semiconductor Engineering Copilot** operates under a strict **Triad Execution Stack**:
1. 🛡️ **REA Evidence Protocol**: Zero assumptions. Every assertion of timing closure ($WNS \ge 0.000\,\text{ns}$), zero DRC violations, or testbench pass is validated by cryptographically grounded tool exit codes, parsed log line ranges, and regex signatures.
2. ✂️ **Ponytail Minimality Ladder**: Surgical code modification. Never rewrite working RTL during ECO timing closure. Climb the ladder: *YAGNI ➔ Codebase Reuse ➔ Native Stdlib ➔ One-Liner ➔ Minimum Viable Diff*.
3. 🔒 **Confidentiality Fortress**: Proprietary foundry PDKs (TSMC, Intel, Samsung), DRC decks, GDSII layouts, and customer RTL are never exfiltrated to public third-party LLMs.

---

## 💎 2. Architectural Blueprint & Multi-Tier Execution Matrix

```
       ╔═══════════════════════════════════════════════════════════════════════╗
       ║                  AI Agent Reasoning & Intent Layer                    ║
       ║          (Claude Code / Cursor / Antigravity / Windsurf)              ║
       ╚══════════════════════════════════╦════════════════════════════════════╝
                                          ║ (JSON-RPC 2.0 stdio)
       ╔══════════════════════════════════╩════════════════════════════════════╗
       ║             SEMICONDUCTOR COPILOT CORE ENGINE (147 TOOLS)             ║
       ║  ┌────────────────────────┬────────────────────────┬────────────────┐ ║
       ║  │ 🔬 Understand Phase    │ 📐 Plan Phase          │ ⚡ Execute     │ ║
       ║  │ 🔍 Analyze (Parsers)   │ 🛠️ Improve (Surgical)  │ ✅ Validate    │ ║
       ║  └────────────────────────┴────────────────────────┴────────────────┘ ║
       ╚══════════════════════════════════╦════════════════════════════════════╝
                                          ║
          ┌───────────────────────────────┼───────────────────────────────┐
          ▼                               ▼                               ▼
╔═══════════════════╗           ╔═══════════════════╗           ╔═══════════════════╗
║ Tier 1: MCP Core  ║           ║ Tier 2: Tcl/Batch ║           ║ Tier 3: Open EDA  ║
║ Native JSON-RPC   ║           ║ Commercial Shells ║           ║ Local Free Tool   ║
║ 147 Tool Schemas  ║           ║ PrimeTime, Innovus║           ║ Icarus, Yosys,    ║
║ Stdio Pipe Server ║           ║ VCS, Genus, Xcel  ║           ║ OpenROAD, Ngspice ║
╚═══════════════════╝           ╚═══════════════════╝           ╚═══════════════════╝
```

---

## 🚀 3. Comprehensive Matrix of the 147 Integrated Tools

<details open>
<summary><b>🔹 Phase 1: Core RTL, Synthesis & Baseline Verification (Tools 1–17)</b></summary>
<br/>

| Icon | Tool Identifier | Scope & Capabilities |
| :---: | :--- | :--- |
| 🔍 | `discover_eda_tools` | Probes host environment, detects 20+ EDA binaries, license environment variables (`LM_LICENSE_FILE`, `SNPSLMD_LICENSE_FILE`). |
| 📂 | `inspect_project` | Surveys workspace file trees for `.v`, `.sv`, `.sdc`, `.xdc`, `.tcl`, `.vcd`, and build manifests. |
| 📖 | `read_rtl_source` | Bounded, safe RTL source inspection with symbol indexing and syntax highlighting bounds. |
| 🧹 | `lint_rtl` | Synthesizability checks, syntax linting (Verilator, slang, Veridian), latch detection. |
| 🌳 | `elaborate_design` | Top-level module hierarchy elaboration, port mismatch detection, and uninstantiated net discovery. |
| 🏃 | `run_simulation` | Headless execution across VCS, Questa, Xcelium, Icarus Verilog, and Verilator. |
| 🎲 | `run_regression` | Multi-seed pseudo-random regression runner aggregating pass/fail ratios and failure signatures. |
| 📋 | `inspect_simulation_logs` | Parses raw simulation stdout for `UVM_FATAL`, `UVM_ERROR`, and assertion failures with timestamps. |
| 🌊 | `inspect_waveform` | Signal value transitions, X-state injection, and glitch inspection across VCD/FST dumps. |
| 📊 | `analyze_coverage` | Parses statement, branch, toggle, expression, and functional coverage databases. |
| ⚙️ | `run_synthesis` | Gate-level netlist synthesis targeting generic gates or technology libraries (Yosys, DC, Genus). |
| ⏱️ | `analyze_timing_report` | Parses STA timing reports, extracts WNS, TNS, WHS, THS, and critical path endpoints. |
| 🔎 | `inspect_critical_paths` | Logic cone breakdowns, gate delays vs net delays, high fanout net bottleneck extraction. |
| 📐 | `inspect_physical_design_reports` | DRC, LVS, and wire congestion heatmap report parser (Innovus, ICC2, OpenROAD). |
| 🧪 | `generate_testbench` | Scaffolds SystemVerilog/UVM 1.2 testbench environments (Driver, Monitor, Agent, Scoreboard). |
| 🩹 | `propose_rtl_patch` | Emits surgical unified diffs fixing timing violations or logic bugs without regression. |
| 🎯 | `validate_patch` | Re-executes targeted simulation or STA runs proving mathematical defect resolution. |

</details>

<details>
<summary><b>🔹 Phase 2: Advanced RTL, UVM & Sign-off Automation (Tools 18–47)</b></summary>
<br/>

| Icon | Tool Identifier | Scope & Capabilities |
| :---: | :--- | :--- |
| 🔀 | `cdc_lint_analyzer` | Identifies unsynchronized crossings, multi-bit bus skew, and reconvergence hazards across clock domains. |
| 📦 | `axi_packet_generator` | Scaffolds AXI4/AXI-Stream masters/slaves with 4KB boundary and handshake deadlock checks. |
| 🔄 | `fsm_optimizer_checker` | Formal verification of FSM states, deadlock discovery, and safe Hamming/Gray/One-Hot encoding. |
| 💾 | `memory_bist_wrapper_gen` | March-C+ SRAM memory testing collar generator with collar muxing and retention test modes. |
| 💡 | `clock_gating_optimizer` | Identifies register feedback loops and inserts Integrated Clock Gating (ICG) cells. |
| ⏩ | `register_slice_generator` | Generates forward, backward, and full 2-depth skid buffers breaking timing paths with zero throughput loss. |
| 📚 | `uvm_ral_model_gen` | Auto-generates UVM Register Abstraction Layer (RAL) blocks and backdoor adapters from JSON maps. |
| ⚖️ | `formal_property_prover` | Synthesizes SVA formal properties (mutex, stability, liveness) for JasperGold / VC Formal. |
| 🎯 | `functional_coverage_matrix_builder` | Crosses configuration modes into SystemVerilog `covergroup` code with explicit bins. |
| 🧩 | `flaky_test_triage` | Clusters multi-seed regression failures isolating delta-cycle races and event queue hazards. |
| 🌉 | `dpi_c_virtual_subsystem` | Scaffolds SystemVerilog DPI-C wrappers connecting C/C++ golden algorithmic models. |
| 📡 | `waveform_event_trigger_search` | Headless scanning of multi-gigabyte VCD/FST dumps for specific transition states. |
| 📜 | `sdc_constraint_validator` | Lints SDC/XDC files for unconstrained endpoints, missing clock latencies, and bad clock groups. |
| 🕒 | `multicycle_path_analyzer` | Verifies multi-cycle path timing exceptions (`-setup N`, `-hold N-1`) against RTL enable logic. |
| 🎲 | `ocv_pocv_margin_auditor` | Evaluates POCV/AOCV timing derates and CPPR pessimism removal across FinFET/GAA nodes. |
| ⚡ | `power_grid_ir_drop_evaluator` | Analyzes Voltus/RedHawk reports for static/dynamic IR-drop and Electromigration (EM). |
| 🔌 | `upf_low_power_intent_linter` | Checks UPF 3.0 / CPF files for power domain definitions, isolation cells, and level shifters. |
| ⏳ | `glitch_and_metastability_window_calc` | Calculates synchronizer MTBF using foundry flip-flop parameters and asynchronous arrival rates. |
| 🛡️ | `drc_antenna_violation_repair` | Pinpoints gate-oxide antenna rule violations; recommends diode cells and metal layer jumping. |
| 🗺️ | `macro_placement_congestion_optimizer` | Analyzes macro flylines and pin densities, creating placement halos to prevent routing congestion. |
| 🌲 | `clock_tree_skew_balancer` | Tunes target insertion delay and skew balancing in Innovus CCOpt and ICC2 CTS. |
| 🔍 | `lvs_discrepancy_pinpointer` | Debugs Calibre/Pegasus LVS discrepancies (shorted power nets, swapped MOS terminals). |
| 🧱 | `dummy_metal_fill_density_advisor` | Parses CMP layer density maps and calculates required dummy metal fill insertion zones. |
| 📉 | `spef_parasitic_net_delay_auditor` | Audits extracted SPEF parasitics to flag excessive net resistance and coupling capacitance. |
| 📈 | `opamp_stability_analyzer` | Measures Phase Margin ($PM \ge 60^\circ$), Gain Margin ($GM \ge 10\,\text{dB}$), and UGBW from SPICE AC sweeps. |
| 🎲 | `monte_carlo_yield_estimator` | Computes standard deviation ($\sigma$) and projected $3\sigma/6\sigma$ yield from transistor mismatch data. |
| 🌡️ | `bandgap_temperature_drift_checker` | Calculates temperature coefficient ($\text{ppm}/^\circ\text{C}$) over $-40^\circ\text{C}$ to $125^\circ\text{C}$ for voltage references. |
| 🎛️ | `bram_dsp_inference_auditor` | Audits FPGA synthesis utilization ensuring arrays infer BRAM and math infers DSP slices. |
| 🕵️ | `ila_debug_core_inserter` | Generates non-intrusive Tcl scripts inserting AMD Vivado ILA cores on internal nets. |
| 📦 | `ipxact_packaging_automator` | Generates IEEE 1685 compliant IP-XACT XML component metadata from RTL headers. |

</details>

<details>
<summary><b>🔹 Phase 3: Chiplets, Hardware Security, ISO 26262 & RISC-V (Tools 48–97)</b></summary>
<br/>

| Icon | Tool Identifier | Scope & Capabilities |
| :---: | :--- | :--- |
| 🧩 | `uci_die_to_die_interconnect_evaluator` | Validates UCIe 1.1/2.0 PHY raw lane error rates and credit flow control across packaging. |
| 🌡️ | `tsv_thermal_stress_analyzer` | Evaluates Through-Silicon Via (TSV) thermal gradients and thermo-mechanical stress in 3D-IC stacks. |
| 🔬 | `microbump_interposer_router_checker` | Audits high-density RDL routes and micro-bump pitch rules on silicon interposers. |
| 🔄 | `d2d_sideband_protocol_verifier` | Checks UCIe and BoW sideband discovery, link training, and lane repair state machines. |
| ⚡ | `power_delivery_network_c4_bump_optimizer` | Optimizes C4 bump matrix placement to minimize PDN impedance resonance peaks. |
| 🏎️ | `hbm3e_phy_timing_skew_auditor` | Verifies HBM3/HBM3e DQS/DQ delay skews across interposer routes. |
| 📐 | `co_design_substrate_warpage_estimator` | Projects multi-die substrate warpage during thermal reflow using packaging CTE models. |
| 🧪 | `die_to_die_boundary_scan_ieee1838_gen` | Scaffolds IEEE 1838 compliant 3D-IC test wrappers and serial control links. |
| 🕵️ | `side_channel_dpa_leakage_detector` | Evaluates Hamming weight and distance correlation detecting DPA leakage in AES/RSA. |
| 🪤 | `hardware_trojan_trigger_scanner` | Detects rare-event hardware Trojan triggers using controllability/observability metrics. |
| ⚡ | `fault_injection_glitch_vulnerability_auditor` | Audits clock/voltage glitch vulnerability on security branches and crypto key ladders. |
| 🎲 | `puf_randomness_and_entropy_evaluator` | Analyzes SRAM/Arbiter PUF startup distributions for intra-die uniqueness and fractional entropy. |
| 🔒 | `secure_jtag_debug_lockout_checker` | Verifies JTAG/SWD debug port lockout state machines and irreversible fuse-blowing behavior. |
| 🛡️ | `memory_bus_aes_xts_inline_encryptor_gen` | Generates zero-cycle latency inline AES-XTS memory encryption wrappers. |
| ⏱️ | `constant_time_crypto_execution_verifier` | Formally verifies that crypto algorithm duration is independent of private key operands. |
| 📜 | `otp_fuse_emulation_and_revocation_linter` | Validates OTP eFuse arrays and anti-rollback version counters. |
| 👥 | `dual_core_lockstep_comparator_gen` | Generates Dual-Core Lockstep (DCLS) architectures with redundant staggered comparators. |
| 🧮 | `ecc_sec_ded_inline_engine` | Generates inline SEC-DED Hamming code encoders/decoders for internal memories and bus packets. |
| 🔄 | `bist_logic_lbist_controller_gen` | Scaffolds Logic BIST PRPG and MISR hardware signature compression engines. |
| 🚗 | `fmeda_safety_metric_calculator` | Calculates SPFM ($\ge 99\%$) and LFM ($\ge 90\%$) for ISO 26262 ASIL-D automotive compliance. |
| 💉 | `safety_mechanism_fault_injection_framework` | Injects transient SEU bit-flips and stuck-at faults measuring diagnostic coverage (DC). |
| 🐕 | `clock_watchdog_frequency_monitor` | Generates hardware clock monitors verifying that system clocks stay within strict bounds. |
| 📉 | `voltage_glitch_brownout_detector_linter` | Lints brownout detection threshold logic ensuring deterministic system reset. |
| ⏰ | `safety_critical_fsm_lockup_watchdog` | Generates independent watchdog timers monitoring state machine execution heartbeats. |
| 💻 | `riscv_instruction_decoder_verifier` | Validates RV32I/RV64I instruction decoding against formal golden specifications. |
| 🌲 | `branch_predictor_accuracy_profiler` | Simulates BTB, PHT, and Gshare/TAGE branch predictors across benchmark traces. |
| 🔄 | `l1_cache_coherency_mesi_checker` | Formally checks MESI/MOESI cache coherency protocols for deadlock and livelock. |
| 🗺️ | `tlb_mmu_page_table_walk_verifier` | Verifies hardware MMU SV39/SV48 multi-level page table walking and address translation exceptions. |
| ⚠️ | `pipeline_hazard_forwarding_auditor` | Audits ALU-to-ALU, MEM-to-EX operand forwarding paths and pipeline stall bubble generation. |
| ⏪ | `out_of_order_rob_recovery_tester` | Verifies Reorder Buffer (ROB) state rollback and speculative branch misprediction recovery. |
| 🧮 | `vector_extension_lane_alu_generator` | Generates scalable SIMD vector arithmetic execution lanes (FP16, BF16, INT8). |
| 🏛️ | `csr_privilege_level_compliance_auditor` | Verifies RISC-V Machine (M), Supervisor (S), and User (U) privilege state transitions. |
| 👁️ | `serdes_eye_diagram_jitter_analyzer` | Analyzes SerDes eye diagrams measuring DJ, RJ, and TJ at $BER = 10^{-12}$. |
| 🔄 | `pll_vco_phase_noise_calculator` | Calculates phase noise, lock time, and cycle-to-cycle jitter for PLL and LC-VCO circuits. |
| 🎛️ | `ctle_dfe_equalization_tuner` | Optimizes CTLE peaking and DFE tap weights to open closed high-speed channel eyes. |
| 📊 | `adc_dac_inl_dnl_calculator` | Evaluates INL and DNL from SPICE ramp and histogram simulation data. |
| 🌊 | `switched_cap_filter_settling_evaluator` | Measures charge injection and settling time in switched-capacitor filter arrays. |
| 📻 | `rf_matching_network_smith_chart_tuner` | Calculates L/C component values for $50\,\Omega$ RF impedance matching networks. |
| ⚡ | `em_coupled_crosstalk_noise_auditor` | Evaluates inductive and capacitive crosstalk between adjacent differential pairs. |
| 📈 | `wafer_yield_defect_density_modeler` | Computes projected chip yield using Murphy's and Negative Binomial defect density models. |
| 🔬 | `optical_proximity_correction_opc_auditor` | Audits sub-resolution assist features (SRAF) to prevent lithographic bridging or pinching. |
| 🛡️ | `guard_ring_substrate_isolation_checker` | Verifies substrate guard ring enclosures isolating analog circuits from digital switching noise. |
| ⚡ | `esd_protection_network_rule_auditor` | Verifies primary/secondary ESD clamp diode sizing and discharge paths on IO pads. |
| 📏 | `electromigration_blech_effect_filter` | Filters false-positive EM warnings on short metal lines using the Blech length threshold. |
| 🩹 | `timing_eco_buffer_sizing_synthesizer` | Synthesizes minimal ECO buffer insertion scripts resolving post-route timing violations. |
| 🗺️ | `ai_wafer_map_spatial_pattern_classifier` | Classifies wafer defect spatial patterns (ring, scratch, edge-cluster) from probe data. |
| 📖 | `standard_cell_library_characterization_linter` | Validates Liberty (`.lib`) timing and power tables for non-monotonicity. |
| 🔌 | `multi_voltage_island_state_retention_evaluator` | Verifies state retention register save/restore sequencing during deep sleep transitions. |
| ⚡ | `pcie_gen6_pam4_fec_burst_analyzer` | Analyzes PAM-4 symbol error distribution and RS-FEC burst error correction margins. |
| 🔐 | `tapeout_gdsii_oasis_integrity_hasher` | Generates SHA-256 signatures, polygon counts, and bounding box checks for GDSII sign-off. |

</details>

<details>
<summary><b>🔹 Phase 4: Frontier Technologies (Photonics, Cryo, Quantum, Space, GaN, Multi-Agent) (Tools 98–147)</b></summary>
<br/>

| Icon | Tool Identifier | Scope & Capabilities |
| :---: | :--- | :--- |
| 💡 | `optical_waveguide_loss_estimator` | Models propagation loss (dB/cm) and bending losses in silicon/SiN optical waveguides. |
| ⚡ | `mach_zehnder_modulator_vpi_tuner` | Optimizes phase shifter lengths and $V_\pi$ drive voltage for high-speed MZM transmitters. |
| 💍 | `microring_resonator_thermal_tuning_tracker` | Calculates thermo-optic tuning power ($\text{mW/nm}$) for dense WDM microring resonators. |
| 📶 | `grating_coupler_efficiency_optimizer` | Computes fiber-to-chip grating coupler alignment tolerances and peak coupling wavelength. |
| 🖨️ | `laser_die_micro_transfer_print_verifier` | Audits III-V DFB laser micro-transfer printing alignment tolerances on silicon interposers. |
| 🌡️ | `cpo_optical_engine_thermal_crosstalk_auditor` | Evaluates thermal coupling between 100W+ ASIC logic and Co-Packaged Optics engines. |
| 📡 | `edfa_optical_snr_budget_calculator` | Calculates link optical signal-to-noise ratio (OSNR) and receiver sensitivity budgets. |
| ❄️ | `cryo_cmos_threshold_voltage_shift_modeler` | Models transistor parameter shifts (carrier freeze-out, $V_{th}$ increase) at $4\,\text{K}$ and $77\,\text{K}$. |
| ⚛️ | `qubit_readout_resonator_dispersive_shift_calc` | Calculates dispersive frequency shifts ($\chi$) for superconducting qubit readout circuits. |
| 📻 | `low_noise_amplifier_noise_temp_evaluator` | Measures cryogenic LNA noise temperature ($T_n < 2\,\text{K}$) and gain flatness. |
| 〰️ | `spin_qubit_microwave_control_iq_generator` | Synthesizes DRAG/Gaussian pulse-shaped I/Q control signals mitigating frequency leakage. |
| ⏱️ | `superconducting_flux_quantum_sfq_timing_auditor` | Verifies picosecond-scale single-flux quantum logic pulse arrival timing. |
| 🧊 | `cryostat_thermal_heat_budget_allocator` | Evaluates dilution refrigerator cooling power limits across high-density wiring looms. |
| 🛡️ | `quantum_error_correction_syndrome_decoder_linter` | Validates surface code syndrome extraction scheduling and real-time decoder latency ($< 1\,\mu\text{s}$). |
| ☢️ | `tid_radiation_total_dose_degradation_modeler` | Projects transistor drive current degradation under Total Ionizing Dose up to $1\,\text{Mrad(Si)}$. |
| 💥 | `see_single_event_latchup_cross_section_evaluator` | Evaluates Single Event Latchup cross-section curves and heavy-ion LET thresholds. |
| 👥 | `triple_modular_redundancy_tmr_voter_inserter` | Automatically inserts TMR triplicated state registers and majority voters with feedback. |
| 🎲 | `seu_immune_dice_cell_layout_checker` | Verifies Dual Interlocked Cell (DICE) flip-flop layout spacing rules. |
| 🌌 | `displacement_damage_leakage_current_calc` | Calculates displacement damage dose induced dark current increases in CMOS image sensors. |
| 🛑 | `single_event_transient_filtering_cell_gen` | Generates low-pass RC filtering cells and temporal guard gates quenching SETs. |
| ⚡ | `rad_hard_power_mosfet_single_event_gate_rupture_auditor` | Audits rad-hard MOSFET gate oxide electric fields under heavy ion strikes (SEGR/SEB immunity). |
| 🧠 | `analog_cim_crossbar_mac_quantizer` | Models ADC/DAC quantization and IR drop along bitlines in analog compute-in-memory arrays. |
| 🔄 | `rram_memristor_conductance_drift_compensator` | Models telegraph noise and conductance relaxation in RRAM/PCM crossbar weight matrices. |
| ⚡ | `spiking_neural_network_lif_neuron_synthesizer` | Generates low-power Leaky Integrate-and-Fire digital neuron modules for SNNs. |
| 🧮 | `systolic_array_stationary_dataflow_optimizer` | Configures weight-stationary and output-stationary dataflow scheduling for 2D systolic arrays. |
| ⏭️ | `sparsity_aware_zero_skipping_logic_gen` | Generates dynamic zero-skipping logic eliminating unneeded multiply-accumulate operations. |
| 💾 | `stt_mram_spin_torque_write_margin_auditor` | Verifies thermal stability factor ($\Delta > 60$) and switching current margins for STT-MRAM. |
| 🔍 | `ternary_content_addressable_tcam_cell_linter` | Validates 10T/16T TCAM search line precharge timing and match line sense delays. |
| 🔬 | `gaa_nanosheet_channel_stress_modeler` | Models crystal lattice strain and piezoresistive mobility in sub-2nm GAAFETs. |
| 🏢 | `cfet_stacked_n_over_p_cell_layout_auditor` | Audits vertical 3D Complementary FET (CFET) monolithic n-over-p transistor stacking layouts. |
| ⚡ | `bspdn_backside_power_via_pitch_checker` | Validates Backside Power Delivery Network (BSPDN) nTSV pitches and backside metal IR drop. |
| 🎯 | `euv_stochastic_defect_risk_analyzer` | Identifies layout hot spots prone to EUV stochastic pinching and bridging defects. |
| 🎨 | `self_aligned_quadruple_patterning_saqp_color_linter` | Checks multi-patterning decomposition coloring legality for SAQP/SADP on tight pitches. |
| 🔌 | `contact_resistance_silicide_schottky_barrier_evaluator` | Models source/drain contact resistivity ($\rho_c < 1 \times 10^{-9}\,\Omega\cdot\text{cm}^2$) and MIS barrier heights. |
| ⚛️ | `quantum_confinement_bandgap_widening_calc` | Calculates subband energy shifts due to 1D/2D quantum confinement in ultra-thin nanosheets. |
| 🌡️ | `thermal_dissipation_nanosheet_superlattice_analyzer` | Evaluates thermal conductivity degradation caused by acoustic phonon boundary scattering. |
| ⚡ | `gan_hemt_two_dimensional_electron_gas_modeler` | Calculates 2DEG sheet carrier density ($n_s$) at AlGaN/GaN heterostructure interfaces. |
| 🛡️ | `sic_mosfet_gate_oxide_breakdown_field_auditor` | Audits peak electric fields in $4H\text{-SiC}$ MOSFET gate oxides under avalanche breakdown. |
| 🌡️ | `power_semiconductor_r_dson_temperature_derater` | Computes dynamic on-resistance ($R_{DS(on)}$) scaling over temperatures up to $200^\circ\text{C}$. |
| ⚡ | `isolated_gate_driver_cmti_immunity_evaluator` | Verifies common-mode transient immunity ($\text{CMTI} > 150\,\text{V/ns}$) for GaN half-bridge stages. |
| 🔄 | `cascode_gan_normally_off_voltage_sharing_checker` | Verifies dynamic voltage sharing between low-voltage Si MOSFET and high-voltage GaN HEMT. |
| ⚡ | `inductive_load_reverse_recovery_qrr_minimizer` | Evaluates reverse recovery charge ($Q_{rr}$) and body diode switching losses during inductive load switching. |
| 🔌 | `bonding_wire_stray_inductance_switching_overshoot_calc` | Calculates drain voltage overshoot ($V = L \cdot \frac{di}{dt}$) and snubber damping networks. |
| 🤝 | `multi_agent_tapeout_signoff_consensus_engine` | Coordinates multi-agent consensus audits across STA, DRC, LVS, FuSa, and Thermal sign-off gates. |
| 🖥️ | `eda_slurm_grid_compute_job_scheduler` | Manages cluster farm workload dispatching and license token contention resolution. |
| 🔍 | `git_verilog_semantic_diff_and_blame_inspector` | Emits AST-aware semantic diffs highlighting functional register and FSM changes. |
| ⚖️ | `eda_license_queue_dynamic_load_balancer` | Balances simulation, synthesis, and implementation queues against live FlexLM tokens. |
| 🛡️ | `ai_prompt_injection_circuit_comment_sanitizer` | Strips adversarial prompt injection payloads hidden inside third-party RTL/IP comments. |
| 🧩 | `hierarchical_eco_spare_cell_allocation_planner` | Pre-allocates spare gate arrays across standard cell rows for metal-only ECO mask revisions. |
| 🏷️ | `cleanroom_rtl_ip_provenance_watermark_verifier` | Injects and verifies zero-overhead cryptographic watermarks in RTL state transitions. |

</details>

---

## 🛠️ 4. Quick Start & Execution Verification

### Step 1: Probe Host Toolchain & Licenses
```powershell
node semiconductor-engineering-copilot/scripts/discover_tools.js
node semiconductor-engineering-copilot/scripts/validate_environment.js
```

### Step 2: Run Full 147-Tool Verification Suite
```powershell
node semiconductor-engineering-copilot/tests/run_tests.js
```

### Step 3: Register MCP in Agent Settings
Add to your `mcp_config.json` or agent IDE settings:
```json
{
  "mcpServers": {
    "semiconductor-eda": {
      "command": "node",
      "args": ["c:/Users/Hoang/Desktop/Skill Semiconductor/semiconductor-engineering-copilot/adapters/mcp/eda_mcp_server.js"]
    }
  }
}
```

---

<div align="center">
  <sub>Built with precision for the next generation of Silicon, Chiplet, and Quantum IC Architecture.</sub><br/>
  <sub>Licensed under Apache 2.0. Copyright 2026 Semiconductor Engineering Copilot Contributors.</sub>
</div>
