# semiconductor-engineering-copilot
# Vivado Batch Non-Project Flow Synthesis & Implementation Script
# Target: AMD Artix-7 (xc7a35tcpg236-1)

set TOP_NAME "sync_fifo"
set PART_NAME "xc7a35tcpg236-1"
set OUTPUT_DIR "./vivado_output"

file mkdir $OUTPUT_DIR

puts "=== Step 1: Reading RTL Sources ==="
read_verilog ../rtl-verification/sync_fifo.v

puts "=== Step 2: Synthesis ==="
synth_design -top $TOP_NAME -part $PART_NAME -directive Default
write_checkpoint -force $OUTPUT_DIR/post_synth.dcp
report_utilization -file $OUTPUT_DIR/post_synth_util.rpt
report_timing_summary -file $OUTPUT_DIR/post_synth_timing.rpt

puts "=== Step 3: Implementation (Optimize & Place) ==="
opt_design
place_design
write_checkpoint -force $OUTPUT_DIR/post_place.dcp

puts "=== Step 4: Routing & Timing Closure ==="
route_design
write_checkpoint -force $OUTPUT_DIR/post_route.dcp
report_timing_summary -file $OUTPUT_DIR/post_route_timing.rpt
report_drc -file $OUTPUT_DIR/post_route_drc.rpt

puts "=== Step 5: Bitstream Generation ==="
# write_bitstream -force $OUTPUT_DIR/sync_fifo.bit

puts "Vivado flow completed cleanly."
exit 0
