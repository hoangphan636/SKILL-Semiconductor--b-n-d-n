/**
 * semiconductor-engineering-copilot
 * Skill Self-Validation Engine (Node.js runtime)
 * Verifies that all domain reference modules, schemas, and adapters exist and meet specifications.
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_FILES = [
  'SKILL.md',
  'README.md',
  'LICENSE',
  'schemas/tool-manifest.schema.json',
  'schemas/execution-result.schema.json',
  'references/architecture.md',
  'references/rtl-design.md',
  'references/design-verification.md',
  'references/simulation-debugging.md',
  'references/synthesis-sta.md',
  'references/physical-design.md',
  'references/analog-mixed-signal.md',
  'references/fpga-design.md',
  'references/dft-signoff.md',
  'references/mcp-integration.md',
  'references/security.md',
  'references/reporting.md',
  'adapters/README.md',
  'adapters/generic-cli/log_parser.js',
  'adapters/tcl/sta_runner.tcl',
  'adapters/mcp/eda_mcp_server.js',
  'scripts/discover_tools.js',
  'scripts/validate_environment.js',
  'scripts/validate_skill.js'
];

function validateSkillStructure(baseDir) {
  const missing = [];
  const present = [];

  for (const rel of REQUIRED_FILES) {
    const full = path.join(baseDir, rel);
    if (!fs.existsSync(full)) {
      missing.push(rel);
    } else {
      const stats = fs.statSync(full);
      present.push({ file: rel, size: stats.size });
    }
  }

  return {
    valid: missing.length === 0,
    total_checked: REQUIRED_FILES.length,
    present_count: present.length,
    missing: missing
  };
}

if (require.main === module) {
  const baseDir = path.resolve(__dirname, '..');
  const res = validateSkillStructure(baseDir);
  console.log(JSON.stringify(res, null, 2));
}

module.exports = { validateSkillStructure, REQUIRED_FILES };
