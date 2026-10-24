# Physical Design & Implementation

## 1. Physical Design Flow (RTL-to-GDSII)

```
Synthesis Netlist (.v) + SDC + PDK / LEF / LIB
                      │
                      ▼
            [1. Floorplanning]  ──> IO pin placement, Power rings/stripes (PDN), Macro placement
                      │
                      ▼
            [2. Placement]      ──> Global & Detailed standard cell placement, Congestion analysis
                      │
                      ▼
            [3. CTS]            ──> Clock Tree Synthesis, Buffer insertion, Skew minimization
                      │
                      ▼
            [4. Routing]        ──> Global routing, Track assignment, Detailed DRC-clean routing
                      │
                      ▼
            [5. Sign-off]       ──> RC Extraction (SPEF), STA (PrimeTime), Physical Checks (DRC/LVS)
```

## 2. Industry Tool Ecosystem
- **Cadence Innovus**:
  - Scripting: Tcl (`innovus -batch -no_gui -files run_pnr.tcl`).
  - Key steps: `init_design`, `planDesign`, `place_opt_design`, `ccopt_design`, `routeDesign`.
- **Synopsys IC Compiler II (ICC2)**:
  - Scripting: Tcl (`icc2_shell -f run_icc2.tcl`).
  - Key steps: `create_floorplan`, `place_opt`, `clock_opt`, `route_auto`, `route_opt`.
- **OpenROAD / OpenLane (Open Source)**:
  - Scripting: Python/Tcl automated flow targeting SkyWater 130nm or GlobalFoundries 180nm.
  - Commands: `openroad -exit flow.tcl`.

## 3. Physical Verification & Sign-off Checks
- **DRC (Design Rule Checking)**: Minimum metal width, spacing, enclosure, density rules.
- **LVS (Layout Versus Schematic)**: Verifies that physical layout device connections match the gate-level netlist schematic.
- **ERC (Electrical Rule Checking)**: Well tie-downs, floating substrates, antenna ratio rules.
- **Congestion Heatmap**: Identifying hot spots (Gcell overflow) in detailed placement before routing.
