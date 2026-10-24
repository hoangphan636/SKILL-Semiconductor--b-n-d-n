// Self-Checking Testbench for sync_fifo
`timescale 1ns/1ps

module sync_fifo_tb;

    parameter DATA_WIDTH = 32;
    parameter ADDR_WIDTH = 4;
    parameter DEPTH      = 1 << ADDR_WIDTH;

    reg                   clk;
    reg                   rst_n;
    reg                   wr_en;
    reg  [DATA_WIDTH-1:0] wr_data;
    wire                  full;
    wire                  almost_full;

    reg                   rd_en;
    wire [DATA_WIDTH-1:0] rd_data;
    wire                  empty;

    integer error_count = 0;
    integer i;

    // Instantiate DUT
    sync_fifo #(
        .DATA_WIDTH(DATA_WIDTH),
        .ADDR_WIDTH(ADDR_WIDTH)
    ) dut (
        .clk(clk),
        .rst_n(rst_n),
        .wr_en(wr_en),
        .wr_data(wr_data),
        .full(full),
        .almost_full(almost_full),
        .rd_en(rd_en),
        .rd_data(rd_data),
        .empty(empty)
    );

    // Clock generator: 100MHz (10ns period)
    always #5 clk = ~clk;

    initial begin
        $dumpfile("sync_fifo.vcd");
        $dumpvars(0, sync_fifo_tb);

        clk     = 0;
        rst_n   = 0;
        wr_en   = 0;
        wr_data = 0;
        rd_en   = 0;

        // Reset sequence
        #20;
        rst_n = 1;
        #10;

        // Check empty flag at start
        if (!empty) begin
            $display("[UVM_ERROR] FIFO not empty after reset at time %0t", $time);
            error_count = error_count + 1;
        end

        // Test Phase 1: Sequential Write until Full
        $display("[INFO] Starting FIFO fill sequence...");
        for (i = 0; i < DEPTH; i = i + 1) begin
            @(posedge clk);
            wr_en   = 1;
            wr_data = 32'hA000_0000 + i;
        end
        @(posedge clk);
        wr_en = 0;

        #1;
        if (!full) begin
            $display("[UVM_ERROR] FIFO failed to assert full flag after %0d writes at time %0t", DEPTH, $time);
            error_count = error_count + 1;
        end

        // Test Phase 2: Sequential Read and verify contents
        $display("[INFO] Starting FIFO drain & verification sequence...");
        for (i = 0; i < DEPTH; i = i + 1) begin
            @(posedge clk);
            rd_en = 1;
            @(negedge clk);
            if (rd_data !== (32'hA000_0000 + i)) begin
                $display("[UVM_ERROR] Mismatch at index %0d! Expected: 0x%08h, Got: 0x%08h", i, 32'hA000_0000 + i, rd_data);
                error_count = error_count + 1;
            end
        end
        @(posedge clk);
        rd_en = 0;

        #10;
        if (!empty) begin
            $display("[UVM_ERROR] FIFO not empty after full drain!");
            error_count = error_count + 1;
        end

        // Summary
        if (error_count == 0) begin
            $display("========================================");
            $display("TEST PASSED: sync_fifo verified clean.");
            $display("========================================");
        end else begin
            $display("========================================");
            $display("TEST FAILED: %0d errors detected.", error_count);
            $display("========================================");
        end

        $finish;
    end

endmodule
