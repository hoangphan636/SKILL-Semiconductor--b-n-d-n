# Design for Testability (DFT) and Semiconductor Sign-off

## 1. DFT Fundamentals
- **Scan Insertion**:
  - Replaces functional flip-flops with scan flip-flops (multiplexed D-FF with `SI`, `SO`, `SE` scan enable).
  - Stitches scan cells into serial scan chains to make internal sequential state fully controllable and observable.
- **ATPG (Automatic Test Pattern Generation)**:
  - Generates compact vector sets targeting stuck-at-0 / stuck-at-1 and at-speed transition delay faults.
  - Fault coverage target: Typically $\ge 99\%$ stuck-at coverage for automotive/mission-critical ASICs.
- **MBIST (Memory Built-In Self-Test)**:
  - Dedicated controller testing embedded SRAM macros with algorithmic march patterns (March C+, March SS).
- **Boundary Scan (IEEE 1149.1 JTAG)**:
  - Test Access Port (TAP) controller with 4/5 dedicated pins: `TCK`, `TMS`, `TDI`, `TDO`, `TRST_N`.
  - Enables PCB interconnect testing without physical bed-of-nails probing.
- **Tools**: Synopsys TestMAX (formerly DFT Compiler / TetraMAX), Siemens Tessent (formerly FastScan).

## 2. Semiconductor Sign-off Checklist
- [ ] **Functional Verification Sign-off**: 100% test plan closure, 100% statement/branch/toggle coverage, 0 open UVM errors.
- [ ] **Timing Sign-off (STA)**: PrimeTime / Tempus sign-off across all PVT corners (WNS $\ge 0.000$, TNS $= 0.000$, WHS $\ge 0.000$, THS $= 0.000$).
- [ ] **Physical Verification Sign-off**:
  - DRC: Zero unapproved violations using golden foundry Calibre / Pegasus runset.
  - LVS: 100% match between extracted layout and source netlist.
  - Antenna Check: Zero gate-oxide rupture violations caused by plasma-induced charge accumulation during metal etching.
  - ERC: Zero substrate latchup or floating well warnings.
- [ ] **Power & IR-Drop Sign-off**: Static and dynamic IR drop within foundry budget (e.g. $\le 3\%$ VDD variation) using Cadence Voltus or Apache RedHawk.
- [ ] **DFT Sign-off**: Target fault coverage verified, scan chain continuity verified.
