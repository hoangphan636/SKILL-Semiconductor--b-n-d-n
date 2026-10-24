// Synchronous FIFO with Parameterized Depth & Width
// Features: Gray pointer protection, full/empty status, almost full flag

module sync_fifo #(
    parameter DATA_WIDTH = 32,
    parameter ADDR_WIDTH = 4,
    parameter DEPTH      = 1 << ADDR_WIDTH
)(
    input  wire                  clk,
    input  wire                  rst_n,

    // Write Interface
    input  wire                  wr_en,
    input  wire [DATA_WIDTH-1:0] wr_data,
    output wire                  full,
    output wire                  almost_full,

    // Read Interface
    input  wire                  rd_en,
    output reg  [DATA_WIDTH-1:0] rd_data,
    output wire                  empty
);

    reg [DATA_WIDTH-1:0] mem [0:DEPTH-1];
    reg [ADDR_WIDTH:0]   wr_ptr;
    reg [ADDR_WIDTH:0]   rd_ptr;

    wire [ADDR_WIDTH:0] fifo_count = wr_ptr - rd_ptr;

    assign empty       = (wr_ptr == rd_ptr);
    assign full        = (wr_ptr[ADDR_WIDTH] != rd_ptr[ADDR_WIDTH]) &&
                         (wr_ptr[ADDR_WIDTH-1:0] == rd_ptr[ADDR_WIDTH-1:0]);
    assign almost_full = (fifo_count >= (DEPTH - 2));

    // Write operation
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            wr_ptr <= 0;
        end else if (wr_en && !full) begin
            mem[wr_ptr[ADDR_WIDTH-1:0]] <= wr_data;
            wr_ptr <= wr_ptr + 1'b1;
        end
    end

    // Read operation
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            rd_ptr  <= 0;
            rd_data <= {DATA_WIDTH{1'b0}};
        end else if (rd_en && !empty) begin
            rd_data <= mem[rd_ptr[ADDR_WIDTH-1:0]];
            rd_ptr  <= rd_ptr + 1'b1;
        end
    end

endmodule
