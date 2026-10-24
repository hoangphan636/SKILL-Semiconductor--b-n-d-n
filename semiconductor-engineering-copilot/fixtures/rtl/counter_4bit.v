// Self-Checking Verilog Counter Fixture with Synchronous Clear & Enable
`timescale 1ns/1ps

module counter_4bit #(
    parameter WIDTH = 4
)(
    input  wire             clk,
    input  wire             rst_n,
    input  wire             en,
    input  wire             clr,
    output reg  [WIDTH-1:0] count,
    output wire             rollover
);

    assign rollover = (count == {WIDTH{1'b1}}) && en;

    always @(posedge clk or negedge rst_n) begin
        if (!rst_n) begin
            count <= {WIDTH{1'b0}};
        end else if (clr) begin
            count <= {WIDTH{1'b0}};
        end else if (en) begin
            count <= count + 1'b1;
        end
    end

endmodule
