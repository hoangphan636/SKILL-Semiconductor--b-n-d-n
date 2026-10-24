# Digital IC Design and RTL Engineering

## 1. HDL Standards & Synthesizability
- **Languages**: Verilog (IEEE 1364-2005), SystemVerilog (IEEE 1800-2017).
- **Golden Coding Rules**:
  - Combinational logic: Use `always_comb`. Avoid latches by ensuring all branches assign all outputs or setting default assignments at block top.
  - Sequential logic: Use `always_ff @(posedge clk or negedge rst_n)` with non-blocking `<=` assignments. Never mix `<=` and `=` in the same procedural block.
  - Avoid non-synthesizable constructs in synthesizable RTL: `#delay`, `initial` blocks (for ASIC; FPGA allows for BRAM init), `fork/join`, non-constant loop bounds.

## 2. Common RTL Microarchitectures
- **Finite State Machines (FSM)**:
  - 2-process or 3-process FSMs separating next-state logic (`always_comb`), state register (`always_ff`), and registered outputs.
  - Explicit default state handling in case of single-event upsets (SEU).
- **Synchronous & Asynchronous FIFOs**:
  - Synchronous FIFO: Single clock domain, status generation via pointer difference or counter.
  - Asynchronous FIFO (CDC): Dual-clock domain using Gray-code pointers, 2-stage DFF synchronizers, and empty/full generation in respective clock domains.
- **Round-Robin and Fixed-Priority Arbiters**:
  - Request/Grant masking schemes to prevent starvation.
- **Digital Protocols**:
  - **UART**: Baud rate generator, oversampling receiver (16x), transmitter shift register, parity check.
  - **SPI**: Master/Slave, mode 0-3 (CPOL/CPHA), shift register, SS framing.
  - **I2C**: Open-drain bidirectional SDA/SCL, start/stop detector, ACK/NACK generation, clock stretching.
  - **AXI4 / AXI4-Lite**: Valid/Ready handshake, separate address/read/write channels, no combinatorial loop between ready and valid.

## 3. Clock-Domain Crossing (CDC) & Resets
- **Metastability Risk**: Setup/hold violations on asynchronous transfers can cause non-deterministic settling times.
- **CDC Topologies**:
  - **Single-bit control**: 2-Flip-Flop (2-FF) synchronizer for slow-to-fast or level signals.
  - **Multi-bit data bus**: Never synchronize multi-bit data with parallel 2-FF (risk of skew/re-ordering). Use MUX recirculate with synchronized enable flag or Async FIFO.
  - **Pulse transfer**: Toggle-based synchronizer or handshake pulse synchronizer.
- **Reset Strategies**:
  - Asynchronously asserted, synchronously de-asserted reset (Reset Synchronizer) to eliminate recovery/removal timing violations.
