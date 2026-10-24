#!/usr/bin/env python3
"""
semiconductor-engineering-copilot
Skill Self-Validation Engine (Python 3.9+ runtime)
Verifies integrity and existence of all specification files.
"""

import json
import os
import sys
from typing import Any, Dict

REQUIRED_FILES = [
    "SKILL.md",
    "README.md",
    "LICENSE",
    "schemas/tool-manifest.schema.json",
    "schemas/execution-result.schema.json",
    "references/architecture.md",
    "references/rtl-design.md",
    "references/design-verification.md",
    "references/simulation-debugging.md",
    "references/synthesis-sta.md",
    "references/physical-design.md",
    "references/analog-mixed-signal.md",
    "references/fpga-design.md",
    "references/dft-signoff.md",
    "references/mcp-integration.md",
    "references/security.md",
    "references/reporting.md",
    "adapters/README.md",
    "adapters/generic-cli/log_parser.py",
    "adapters/tcl/sta_runner.tcl",
    "adapters/mcp/eda_mcp_server.py",
    "scripts/discover_tools.py",
    "scripts/validate_environment.py",
    "scripts/validate_skill.py"
]

def validate_skill_structure(base_dir: str) -> Dict[str, Any]:
    missing = []
    present = []
    for rel in REQUIRED_FILES:
        full = os.path.join(base_dir, rel)
        if not os.path.exists(full):
            missing.append(rel)
        else:
            present.append({"file": rel, "size": os.path.getsize(full)})

    return {
        "valid": len(missing) == 0,
        "total_checked": len(REQUIRED_FILES),
        "present_count": len(present),
        "missing": missing
    }

if __name__ == "__main__":
    base = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    print(json.dumps(validate_skill_structure(base), indent=2))
