# Design Verification & UVM Architecture

## 1. SystemVerilog Verification Fundamentals
- **Constrained-Random Verification (CRV)**: `rand` / `randc` variables, `constraint` blocks with distribution `dist`, implication `->`, and `solve...before`.
- **SystemVerilog Assertions (SVA)**:
  - Immediate assertions: Procedural checks `assert (expr) else $error(...)`.
  - Concurrent assertions: Clocked temporal sequences and properties:
    ```systemverilog
    property p_req_ack;
      @(posedge clk) disable iff (!rst_n)
      req |-> ##[1:3] ack;
    endproperty
    assert property (p_req_ack) else $error("ACK timeout following REQ");
    ```

## 2. Universal Verification Methodology (UVM 1.2 / IEEE 1800.2)
- **Component Hierarchy**:
  - `uvm_sequence_item`: Transaction data model representing protocol transfers.
  - `uvm_sequencer`: Arbitrates and sequences transaction generation.
  - `uvm_driver`: Converts high-level sequence items into cycle-accurate pin wiggles on the interface.
  - `uvm_monitor`: Passively samples interface activity and broadcasts transactions via `uvm_analysis_port`.
  - `uvm_agent`: Encapsulates driver, sequencer, and monitor (Configurable as `UVM_ACTIVE` or `UVM_PASSIVE`).
  - `uvm_scoreboard`: Compares observed DUT transactions against a golden reference model.
  - `uvm_env`: Assembles agents, scoreboards, and register models (RAL).
  - `uvm_test`: Configures the environment and starts base sequences.
- **Phasing**: `build_phase`, `connect_phase`, `end_of_elaboration_phase`, `start_of_simulation_phase`, `run_phase` (task with objections `phase.raise_objection`, `phase.drop_objection`), `check_phase`, `report_phase`.

## 3. Coverage Closure & Failure Triage
- **Code Coverage**: Line, Branch, Toggle, Condition, and FSM State/Transition coverage.
- **Functional Coverage**: `covergroup`, `coverpoint`, and `cross` coverage matching verification plan features.
- **Triage Protocol**:
  - Search simulation log for `UVM_FATAL` and `UVM_ERROR`.
  - Identify simulation timestamp of first failure.
  - Cross-examine waveform around failure point.
  - Distinguish testbench bug (misconfigured predictor/scoreboard) from genuine RTL bug.
