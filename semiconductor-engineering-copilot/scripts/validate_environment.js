/**
 * semiconductor-engineering-copilot
 * Environment Validator (Node.js runtime)
 * Verifies OS prerequisites, workspace structure, and file integrity.
 */

const fs = require('fs');
const path = require('path');
const { discoverAllTools } = require('./discover_tools');

function validateEnvironment(projectDir = process.cwd()) {
  const checks = [];

  // Check 1: Host Operating System
  const isLinux = process.platform === 'linux';
  const isWin = process.platform === 'win32';
  checks.push({
    name: 'Operating System Check',
    status: isLinux ? 'PASS' : (isWin ? 'WARN' : 'INFO'),
    detail: `Current platform: ${process.platform}. (Note: Synopsys/Cadence production sign-off requires RHEL/Rocky Linux or WSL2).`
  });

  // Check 2: Available Toolchains
  const manifest = discoverAllTools();
  const detected = manifest.tools.filter(t => t.status !== 'uninstalled');
  checks.push({
    name: 'EDA Toolchain Presence',
    status: detected.length > 0 ? 'PASS' : 'WARN',
    detail: `Detected ${detected.length} EDA binaries out of ${manifest.tools.length} surveyed.`
  });

  // Check 3: Licenses
  const licVars = manifest.host_environment.license_servers;
  checks.push({
    name: 'License Environment Variables',
    status: licVars.length > 0 ? 'PASS' : 'INFO',
    detail: licVars.length > 0 ? `Active: ${licVars.join(', ')}` : 'No proprietary FlexLM/Cadence license variables set.'
  });

  // Check 4: Workspace File Write Permissions
  let writeOk = false;
  try {
    const testFile = path.join(projectDir, '.copilot_write_test.tmp');
    fs.writeFileSync(testFile, 'test', 'utf8');
    fs.unlinkSync(testFile);
    writeOk = true;
  } catch (e) {
    writeOk = false;
  }
  checks.push({
    name: 'Workspace Write Permission',
    status: writeOk ? 'PASS' : 'FAIL',
    detail: writeOk ? 'Workspace directory is writable.' : 'Cannot write temporary files to workspace.'
  });

  const overall = checks.every(c => c.status !== 'FAIL') ? 'READY' : 'ACTION_REQUIRED';

  return {
    timestamp: new Date().toISOString(),
    overall_status: overall,
    checks: checks
  };
}

if (require.main === module) {
  const result = validateEnvironment();
  console.log(JSON.stringify(result, null, 2));
}

module.exports = { validateEnvironment };
