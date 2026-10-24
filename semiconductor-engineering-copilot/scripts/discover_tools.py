#!/usr/bin/env python3
"""
semiconductor-engineering-copilot
Tool Discovery Engine (Python 3.9+ runtime)
Probes environment for EDA tools, license variables, and execution modes.
"""

import json
import os
import shutil
import subprocess
import sys
from datetime import datetime
from typing import Any, Dict, List, Optional

KNOWN_EDA_TOOLS = [
    {"name": "iverilog", "vendor": "Icarus Verilog", "category": "simulation", "cmd": ["iverilog", "-v"], "bin": "iverilog"},
    {"name": "vvp", "vendor": "Icarus Verilog Runtime", "category": "simulation", "cmd": ["vvp", "-v"], "bin": "vvp"},
    {"name": "verilator", "vendor": "Veripool", "category": "simulation", "cmd": ["verilator", "--version"], "bin": "verilator"},
    {"name": "vcs", "vendor": "Synopsys", "category": "simulation", "cmd": ["vcs", "-ID"], "bin": "vcs", "lic": "SNPSLMD_LICENSE_FILE"},
    {"name": "vsim", "vendor": "Siemens Questa / ModelSim", "category": "simulation", "cmd": ["vsim", "-version"], "bin": "vsim", "lic": "LM_LICENSE_FILE"},
    {"name": "xrun", "vendor": "Cadence Xcelium", "category": "simulation", "cmd": ["xrun", "-version"], "bin": "xrun", "lic": "CDS_LIC_FILE"},
    {"name": "gtkwave", "vendor": "GTKWave", "category": "waveform_viewer", "cmd": ["gtkwave", "--version"], "bin": "gtkwave"},
    {"name": "yosys", "vendor": "YosysHQ", "category": "synthesis", "cmd": ["yosys", "-V"], "bin": "yosys"},
    {"name": "dc_shell", "vendor": "Synopsys Design Compiler", "category": "synthesis", "cmd": ["dc_shell", "-v"], "bin": "dc_shell", "lic": "SNPSLMD_LICENSE_FILE"},
    {"name": "pt_shell", "vendor": "Synopsys PrimeTime", "category": "sta", "cmd": ["pt_shell", "-v"], "bin": "pt_shell", "lic": "SNPSLMD_LICENSE_FILE"},
    {"name": "genus", "vendor": "Cadence Genus", "category": "synthesis", "cmd": ["genus", "-version"], "bin": "genus", "lic": "CDS_LIC_FILE"},
    {"name": "tempus", "vendor": "Cadence Tempus", "category": "sta", "cmd": ["tempus", "-version"], "bin": "tempus", "lic": "CDS_LIC_FILE"},
    {"name": "openroad", "vendor": "Precision Innovations / OpenROAD", "category": "physical_design", "cmd": ["openroad", "-version"], "bin": "openroad"},
    {"name": "innovus", "vendor": "Cadence Innovus", "category": "physical_design", "cmd": ["innovus", "-version"], "bin": "innovus", "lic": "CDS_LIC_FILE"},
    {"name": "icc2_shell", "vendor": "Synopsys IC Compiler II", "category": "physical_design", "cmd": ["icc2_shell", "-v"], "bin": "icc2_shell", "lic": "SNPSLMD_LICENSE_FILE"},
    {"name": "ngspice", "vendor": "Ngspice Project", "category": "analog", "cmd": ["ngspice", "-v"], "bin": "ngspice"},
    {"name": "spectre", "vendor": "Cadence Spectre", "category": "analog", "cmd": ["spectre", "-W"], "bin": "spectre", "lic": "CDS_LIC_FILE"},
    {"name": "vivado", "vendor": "AMD Vivado", "category": "fpga", "cmd": ["vivado", "-version"], "bin": "vivado", "lic": "XILINXD_LICENSE_FILE"},
    {"name": "quartus_sh", "vendor": "Intel Quartus", "category": "fpga", "cmd": ["quartus_sh", "-v"], "bin": "quartus_sh", "lic": "LM_LICENSE_FILE"}
]

def probe_binary(bin_name: str) -> Optional[str]:
    return shutil.which(bin_name)

def probe_version(cmd: List[str]) -> str:
    try:
        proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=3)
        out = (proc.stdout or proc.stderr).strip().splitlines()
        return out[0][:80] if out else "Unknown Version"
    except Exception as e:
        return f"Probe Error: {type(e).__name__}"

def discover_all_tools() -> Dict[str, Any]:
    lic_vars = ["LM_LICENSE_FILE", "SNPSLMD_LICENSE_FILE", "CDS_LIC_FILE", "XILINXD_LICENSE_FILE"]
    active_lics = [v for v in lic_vars if os.environ.get(v)]

    tools_out: List[Dict[str, Any]] = []
    for tool in KNOWN_EDA_TOOLS:
        path = probe_binary(tool["bin"])
        if path:
            status = "detected"
            if "lic" in tool:
                status = "available_licensed" if (os.environ.get(tool["lic"]) or os.environ.get("LM_LICENSE_FILE")) else "license_missing"
            version = probe_version(tool["cmd"])
            tools_out.append({
                "name": tool["name"],
                "vendor": tool["vendor"],
                "category": tool["category"],
                "status": status,
                "executable_path": path,
                "version": version,
                "execution_mode": "batch_cli",
                "supports_headless": True,
                "license_variable": tool.get("lic")
            })
        else:
            tools_out.append({
                "name": tool["name"],
                "vendor": tool["vendor"],
                "category": tool["category"],
                "status": "uninstalled",
                "executable_path": None,
                "version": None,
                "execution_mode": "unsupported",
                "supports_headless": True,
                "license_variable": tool.get("lic")
            })

    return {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "host_environment": {
            "os": sys.platform,
            "arch": os.uname().machine if hasattr(os, "uname") else "x86_64",
            "python_version": sys.version.split()[0],
            "license_servers": active_lics
        },
        "tools": tools_out
    }

if __name__ == "__main__":
    print(json.dumps(discover_all_tools(), indent=2))
