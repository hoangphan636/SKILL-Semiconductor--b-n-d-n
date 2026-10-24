/**
 * Unit Tests for Module A: Design Architecture and IP Intelligence (Capabilities 1-10)
 */

const { DesignArchitectureModule } = require('../../modules/v3/design-architecture/design_architecture');

function runModuleATests(assert) {
  console.log('Testing Module A: Design Architecture and IP Intelligence');
  const modA = new DesignArchitectureModule();

  // 1. Specification Compiler
  const specOut = modA.compileSpecification('# Module sync_fifo\nclock: clk_sys\nreset: rst_n\nport: data_in, input, [31:0]\nport: full, output, 1-bit');
  assert(specOut.status === 'COMPILED' && specOut.module_name === 'sync_fifo' && specOut.extracted_ports_count === 2, '1. Specification Compiler parses ports and clocks');
  assert(modA.compileSpecification('').status === 'ERROR', '1b. Specification Compiler handles empty input safely');

  // 2. RTL Interface Contract Checker
  const src = { outputs: [{ name: 'tx_data', width: 32 }, { name: 'tx_valid', width: 1 }] };
  const sink = { inputs: [{ name: 'tx_data', width: 32 }, { name: 'tx_valid', width: 1 }] };
  const badSink = { inputs: [{ name: 'tx_data', width: 16 }] };
  assert(modA.checkInterfaceContract(src, sink).status === 'COMPLIANT', '2. Interface Contract Checker validates matching contracts');
  assert(modA.checkInterfaceContract(src, badSink).status === 'CONTRACT_VIOLATION', '2b. Interface Contract Checker detects bitwidth mismatch');

  // 3. IP Reuse Advisor
  const catalog = [{ name: 'uart_core', category: 'communication', tags: ['serial', 'uart'] }];
  const advise = modA.adviseIpReuse('High-speed UART serial transmitter', catalog);
  assert(advise.recommendation === 'REUSE_EXISTING_QUALIFIED_IP' && advise.candidates.length === 1, '3. IP Reuse Advisor suggests matching IP');

  // 4. Parameterized RTL Validator
  const config = { DATA_WIDTH: 32, FIFO_DEPTH: 16 };
  const rules = { DATA_WIDTH: { min: 8, max: 64 }, FIFO_DEPTH: { is_power_of_two: true } };
  assert(modA.validateParameters(config, rules).status === 'VALID', '4. Parameterized RTL Validator validates power-of-two constraints');
  assert(modA.validateParameters({ FIFO_DEPTH: 15 }, rules).status === 'INVALID_CONFIGURATION', '4b. Parameterized RTL Validator catches non-power-of-two');

  // 5. Register Map Generator
  const regs = [{ name: 'CTRL', access: 'RW' }, { name: 'STATUS', access: 'RO' }];
  const regMap = modA.generateRegisterMap(regs, 0x2000);
  assert(regMap.registers.length === 2 && regMap.registers[0].offset_hex === '0x2000', '5. Register Map Generator allocates offsets');

  // 6. Memory Architecture Advisor
  const memAdv = modA.adviseMemoryArchitecture(65536, 2, 400);
  assert(memAdv.selected_primitive.includes('BRAM'), '6. Memory Architecture Advisor maps 64KB to BRAM');

  // 7. Bus Protocol Compliance Assistant
  const busOk = modA.checkBusCompliance('AXI4', { valid: true, ready: true, address: 0x1000 });
  const busBad = modA.checkBusCompliance('AXI4', { valid: true, ready: false, valid_deasserted: true });
  assert(busOk.status === 'COMPLIANT' && busBad.status === 'VIOLATIONS_FOUND', '7. Bus Protocol Compliance detects handshake drops');

  // 8. Clock and Reset Architecture Reviewer
  const clkRev = modA.reviewClockResetArchitecture(['clk1', 'clk2'], [{ name: 'rst1', has_synchronizer: true }, { name: 'rst2', has_synchronizer: false }]);
  assert(clkRev.warnings_count === 2, '8. Clock/Reset Reviewer flags async reset without synchronizer');

  // 9. Design Complexity Estimator
  const comp = modA.estimateComplexity(450, 10, 4);
  assert(comp.complexity_tier === 'LOW' && comp.estimated_verification_days > 0, '9. Design Complexity Estimator calculates verification effort');

  // 10. Architecture Decision Records
  const adr = modA.generateAdr('Use Async FIFO for CDC', 'Clock domains are unrelated', 'Adopt Gray-code dual clock FIFO', 'Adds 2 cycle latency');
  assert(adr.status === 'CREATED' && adr.adr_markdown.includes('ADR: Use Async FIFO'), '10. Architecture Decision Record formats markdown document');
}

module.exports = { runModuleATests };
