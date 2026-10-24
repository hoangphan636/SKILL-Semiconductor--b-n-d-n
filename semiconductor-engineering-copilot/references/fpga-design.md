# FPGA Design and Implementation

## 1. Major Vendor Toolchains
- **AMD / Xilinx Vivado**:
  - Target Architectures: 7-Series, UltraScale, UltraScale+, Versal.
  - Headless Execution: `vivado -mode batch -source run_impl.tcl -notrace -log vivado.log`.
  - Constraints: XDC (subset of SDC with physical pin placement constraints like `set_property PACKAGE_PIN ...`).
- **Intel / Altera Quartus Prime**:
  - Target Architectures: Cyclone, Arria, Stratix, Agilex.
  - Headless Execution: `quartus_sh --flow compile my_project`.
  - Constraints: SDC + QSF (Quartus Settings File).

## 2. FPGA Implementation Pipeline
1. **Synthesis**: Converts RTL into FPGA primitives: LUTs (Lookup Tables), FFs, BRAMs (Block RAMs), DSP48/DSP58 slices.
2. **Opt Design**: Logic trimming and boundary optimization.
3. **Placement**: Maps primitives into specific CLBs (Configurable Logic Blocks) and slices across the FPGA fabric.
4. **Physical Optimization (`phys_opt_design`)**: High-fanout replication, register re-timing across LUTs.
5. **Routing**: Connects slices through programmable interconnect switchboxes.
6. **Bitstream Generation (`write_bitstream`)**: Creates `.bit` or `.bin` binary image for FPGA SRAM programming.

## 3. In-System Hardware Debugging
- **AMD Integrated Logic Analyzer (ILA)**:
  - Instantiated in RTL (`vitis_net_p4` or IP catalog) or inserted post-synthesis (`create_debug_core`, `connect_debug_port`).
  - Probes runtime signals stored in dedicated BRAM buffers triggered on pattern matches.
- **Intel SignalTap II**:
  - Embedded logic analyzer core captured over JTAG connection.

## 4. ASIC vs FPGA Discrepancies
- **Clocking**: ASIC uses custom clock trees; FPGA uses dedicated clock distribution backbones (BUFG, BUFR, MMCM, PLL). Gated clocks in FPGA RTL cause timing skew and must be converted to Clock Enables (`CE`).
- **Memory**: FPGA infers synchronous BRAM with synchronous read address registers; asynchronous read arrays turn into distributed LUT RAM.
- **Initialization**: FPGA registers can be reliably initialized via `initial reg_q = 0;`, whereas ASIC requires explicit hardware reset pins (`rst_n`).
