/**
 * semiconductor-engineering-copilot
 * Tool Discovery Engine (Node.js runtime)
 * Probes local environment for EDA toolchains, licenses, and MCP endpoints.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const KNOWN_EDA_TOOLS = [
  // Simulators
  { name: 'iverilog', vendor: 'Icarus Verilog', category: 'simulation', cmd: 'iverilog -v', bin: 'iverilog' },
  { name: 'vvp', vendor: 'Icarus Verilog Runtime', category: 'simulation', cmd: 'vvp -v', bin: 'vvp' },
  { name: 'verilator', vendor: 'Veripool', category: 'simulation', cmd: 'verilator --version', bin: 'verilator' },
  { name: 'vcs', vendor: 'Synopsys', category: 'simulation', cmd: 'vcs -ID', bin: 'vcs', lic: 'SNPSLMD_LICENSE_FILE' },
  { name: 'vsim', vendor: 'Siemens Questa / ModelSim', category: 'simulation', cmd: 'vsim -version', bin: 'vsim', lic: 'LM_LICENSE_FILE' },
  { name: 'xrun', vendor: 'Cadence Xcelium', category: 'simulation', cmd: 'xrun -version', bin: 'xrun', lic: 'CDS_LIC_FILE' },

  // Waveform Viewers
  { name: 'gtkwave', vendor: 'GTKWave', category: 'waveform_viewer', cmd: 'gtkwave --version', bin: 'gtkwave' },
  { name: 'surfer', vendor: 'Surfer (Rust/Web)', category: 'waveform_viewer', cmd: 'surfer --version', bin: 'surfer' },

  // Synthesis & STA
  { name: 'yosys', vendor: 'YosysHQ', category: 'synthesis', cmd: 'yosys -V', bin: 'yosys' },
  { name: 'dc_shell', vendor: 'Synopsys Design Compiler', category: 'synthesis', cmd: 'dc_shell -v', bin: 'dc_shell', lic: 'SNPSLMD_LICENSE_FILE' },
  { name: 'pt_shell', vendor: 'Synopsys PrimeTime', category: 'sta', cmd: 'pt_shell -v', bin: 'pt_shell', lic: 'SNPSLMD_LICENSE_FILE' },
  { name: 'genus', vendor: 'Cadence Genus', category: 'synthesis', cmd: 'genus -version', bin: 'genus', lic: 'CDS_LIC_FILE' },
  { name: 'tempus', vendor: 'Cadence Tempus', category: 'sta', cmd: 'tempus -version', bin: 'tempus', lic: 'CDS_LIC_FILE' },

  // Physical Design
  { name: 'openroad', vendor: 'Precision Innovations / OpenROAD', category: 'physical_design', cmd: 'openroad -version', bin: 'openroad' },
  { name: 'innovus', vendor: 'Cadence Innovus', category: 'physical_design', cmd: 'innovus -version', bin: 'innovus', lic: 'CDS_LIC_FILE' },
  { name: 'icc2_shell', vendor: 'Synopsys IC Compiler II', category: 'physical_design', cmd: 'icc2_shell -v', bin: 'icc2_shell', lic: 'SNPSLMD_LICENSE_FILE' },

  // Analog
  { name: 'ngspice', vendor: 'Ngspice Project', category: 'analog', cmd: 'ngspice -v', bin: 'ngspice' },
  { name: 'spectre', vendor: 'Cadence Spectre', category: 'analog', cmd: 'spectre -W', bin: 'spectre', lic: 'CDS_LIC_FILE' },

  // FPGA
  { name: 'vivado', vendor: 'AMD / Xilinx Vivado', category: 'fpga', cmd: 'vivado -version', bin: 'vivado', lic: 'XILINXD_LICENSE_FILE' },
  { name: 'quartus_sh', vendor: 'Intel / Altera Quartus', category: 'fpga', cmd: 'quartus_sh -v', bin: 'quartus_sh', lic: 'LM_LICENSE_FILE' }
];

function checkBinary(binName) {
  try {
    const isWin = process.platform === 'win32';
    const checkCmd = isWin ? `where.exe ${binName}` : `which ${binName}`;
    const output = execSync(checkCmd, { stdio: ['pipe', 'pipe', 'ignore'], timeout: 3000 });
    const fullPath = output.toString().trim().split(/\r?\n/)[0];
    return fullPath || null;
  } catch (e) {
    return null;
  }
}

function probeVersion(cmd) {
  try {
    const out = execSync(cmd, { stdio: ['pipe', 'pipe', 'ignore'], timeout: 4000 });
    const firstLine = out.toString().trim().split(/\r?\n/)[0];
    return firstLine.substring(0, 80);
  } catch (e) {
    return 'Detected (Version probe timed out or requires GUI/license)';
  }
}

function discoverAllTools() {
  const detected = [];
  const licVars = ['LM_LICENSE_FILE', 'SNPSLMD_LICENSE_FILE', 'CDS_LIC_FILE', 'XILINXD_LICENSE_FILE'];
  const presentLicVars = licVars.filter(v => Boolean(process.env[v]));

  for (const tool of KNOWN_EDA_TOOLS) {
    const binPath = checkBinary(tool.bin);
    if (binPath) {
      let status = 'detected';
      if (tool.lic) {
        status = process.env[tool.lic] || process.env['LM_LICENSE_FILE'] ? 'available_licensed' : 'license_missing';
      }
      const version = probeVersion(tool.cmd);
      detected.push({
        name: tool.name,
        vendor: tool.vendor,
        category: tool.category,
        status: status,
        executable_path: binPath,
        version: version,
        execution_mode: 'batch_cli',
        supports_headless: true,
        license_variable: tool.lic || null
      });
    } else {
      detected.push({
        name: tool.name,
        vendor: tool.vendor,
        category: tool.category,
        status: 'uninstalled',
        executable_path: null,
        version: null,
        execution_mode: 'unsupported',
        supports_headless: true,
        license_variable: tool.lic || null
      });
    }
  }

  const manifest = {
    timestamp: new Date().toISOString(),
    host_environment: {
      os: process.platform,
      arch: process.arch,
      node_version: process.version,
      license_servers: presentLicVars
    },
    tools: detected
  };

  return manifest;
}

if (require.main === module) {
  const result = discoverAllTools();
  console.log(JSON.stringify(result, null, 2));
}

module.exports = { discoverAllTools, KNOWN_EDA_TOOLS };
