# Analog, Mixed-Signal, and Custom IC Design

## 1. Tool Ecosystem
- **Cadence Virtuoso**: Industry standard for custom transistor schematic capture and polygon layout.
- **Simulators**:
  - **Cadence Spectre**: High-accuracy foundry-qualified SPICE/RF simulator (`spectre input.scs -format psfbin`).
  - **Synopsys HSPICE / FineSim**: Transistor-level timing and golden accuracy simulation.
  - **Ngspice (Open Source)**: Standard Berkeley SPICE compatible simulator (`ngspice -b input.sp -o output.log`).

## 2. Core SPICE Analyses
- **Operating Point (`.OP`)**: DC bias currents, node voltages, transistor saturation regions ($V_{ds} \ge V_{gs} - V_{th}$), transconductance $g_m$, output conductance $g_{ds}$.
- **DC Sweep (`.DC`)**: Input voltage vs output transfer curve (VTC), finding threshold crossings.
- **AC Small-Signal (`.AC`)**: Frequency response, gain ($A_v$), unity gain bandwidth (GBW), phase margin (PM) for op-amp stability ($PM \ge 60^\circ$).
- **Transient (`.TRAN`)**: Time-domain response, slew rate, step response, eye diagrams, clock jitter.
- **Noise Analysis (`.NOISE`)**: Input-referred noise, flicker ($1/f$) noise, thermal noise ($4kTR$).
- **Monte Carlo & PVT Corners**: Process, Voltage, Temperature variations, local mismatch (Pelgrom's model) across SS, TT, FF, SF, FS foundry corners.

## 3. Convergence & Troubleshooting
- **Simulation Failure to Converge**:
  - Tighten or relax tolerance parameters (`reltol`, `vabstol`, `iabstol`).
  - Set initial conditions: `.nodeset` or `.ic`.
  - Switch integration algorithm from Trapezoidal (risk of numerical ringing) to Gear.
