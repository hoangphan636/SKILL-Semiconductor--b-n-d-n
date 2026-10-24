#!/usr/bin/env python3
"""
semiconductor-engineering-copilot
Environment Validator (Python 3.9+ runtime)
Verifies OS prerequisites, workspace permissions, and EDA tooling.
"""

import json
import os
import sys
from datetime import datetime
from typing import Any, Dict
from discover_tools import discover_all_tools

def validate_environment(project_dir: str = ".") -> Dict[str, Any]:
    checks = []

    # Check 1: Host OS
    is_linux = sys.platform.startswith("linux")
    is_win = sys.platform.startswith("win32")
    checks.append({
        "name": "Operating System Check",
        "status": "PASS" if is_linux else ("WARN" if is_win else "INFO"),
        "detail": f"Current platform: {sys.platform}. (Synopsys/Cadence EDA tools target Enterprise Linux/WSL2)."
    })

    # Check 2: EDA Toolchain
    manifest = discover_all_tools()
    detected = [t for t in manifest["tools"] if t["status"] != "uninstalled"]
    checks.append({
        "name": "EDA Toolchain Presence",
        "status": "PASS" if detected else "WARN",
        "detail": f"Detected {len(detected)} EDA tools out of {len(manifest['tools'])}."
    })

    # Check 3: Licenses
    lic_servers = manifest["host_environment"]["license_servers"]
    checks.append({
        "name": "License Environment Variables",
        "status": "PASS" if lic_servers else "INFO",
        "detail": f"Active: {', '.join(lic_servers)}" if lic_servers else "No FlexLM / Cadence license variables found."
    })

    # Check 4: Workspace Write Permission
    test_file = os.path.join(project_dir, ".copilot_write_test.tmp")
    write_ok = False
    try:
        with open(test_file, "w") as f:
            f.write("test")
        os.remove(test_file)
        write_ok = True
    except Exception:
        write_ok = False

    checks.append({
        "name": "Workspace Write Permission",
        "status": "PASS" if write_ok else "FAIL",
        "detail": "Workspace directory is writable." if write_ok else "Cannot write temporary files to workspace."
    })

    overall = "READY" if all(c["status"] != "FAIL" for c in checks) else "ACTION_REQUIRED"

    return {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "overall_status": overall,
        "checks": checks
    }

if __name__ == "__main__":
    print(json.dumps(validate_environment(), indent=2))
