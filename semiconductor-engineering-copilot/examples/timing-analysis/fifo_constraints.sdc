# Synopsys Design Constraints for Synchronous FIFO
# Design: sync_fifo
# Target Clock: 200 MHz (5.0 ns period)

# 1. Primary Clock Definition
create_clock -name CLK_FIFO -period 5.000 [get_ports clk]
set_clock_uncertainty -setup 0.150 [get_clocks CLK_FIFO]
set_clock_uncertainty -hold  0.080 [get_clocks CLK_FIFO]
set_clock_transition 0.100 [get_clocks CLK_FIFO]

# 2. Input Delays (Assuming external source launch with 1.2ns delay)
set_input_delay -clock CLK_FIFO -max 1.200 [get_ports {wr_en rd_en wr_data[*] rst_n}]
set_input_delay -clock CLK_FIFO -min 0.200 [get_ports {wr_en rd_en wr_data[*] rst_n}]

# 3. Output Delays (Assuming external receiver requires 1.0ns setup)
set_output_delay -clock CLK_FIFO -max 1.000 [get_ports {rd_data[*] full almost_full empty}]
set_output_delay -clock CLK_FIFO -min 0.100 [get_ports {rd_data[*] full almost_full empty}]

# 4. Environment & Driving Cells
set_load -pin_load 0.05 [all_outputs]
