#!/usr/bin/env python3
"""
semiconductor-engineering-copilot
Log Parser Adapter (Python 3.9+ runtime)
Parses simulator logs and STA reports into structured dictionaries.
"""

import re
from typing import Any, Dict, List, Optional

def parse_simulation_log(log_content: str) -> Dict[str, Any]:
    result: Dict[str, Any] = {
        "status": "UNKNOWN",
        "uvm_fatal_count": 0,
        "uvm_error_count": 0,
        "uvm_warning_count": 0,
        "assertion_failures": 0,
        "simulation_time": None,
        "errors": []
    }

    lines = log_content.splitlines()
    for idx, line in enumerate(lines, 1):
        if "UVM_FATAL" in line:
            result["uvm_fatal_count"] += 1
            result["errors"].append({"line": idx, "text": line.strip()})
        elif "UVM_ERROR" in line:
            result["uvm_error_count"] += 1
            result["errors"].append({"line": idx, "text": line.strip()})
        elif "UVM_WARNING" in line:
            result["uvm_warning_count"] += 1

        if re.search(r"assertion.*failed", line, re.I) or "SVA error" in line:
            result["assertion_failures"] += 1
            result["errors"].append({"line": idx, "text": line.strip()})

        time_match = re.search(r"(?:Simulation time|Time):\s*(\d+\s*(?:ns|ps|us|ms))", line, re.I)
        if time_match:
            result["simulation_time"] = time_match.group(1)

    if result["uvm_fatal_count"] > 0 or result["uvm_error_count"] > 0 or result["assertion_failures"] > 0:
        result["status"] = "FAILURE"
    elif "PASSED" in log_content or "TEST PASSED" in log_content or "Simulation finished" in log_content:
        result["status"] = "SUCCESS"

    return result

def parse_timing_report(report_content: str) -> Dict[str, Any]:
    result: Dict[str, Any] = {
        "status": "UNKNOWN",
        "wns_ns": None,
        "tns_ns": None,
        "violating_paths_count": 0,
        "critical_path": {
            "startpoint": None,
            "endpoint": None,
            "slack": None,
            "path_group": None
        }
    }

    lines = report_content.splitlines()
    for line in lines:
        slack_match = re.search(r"slack\s*(?:\(VIOLATED\)|\(MET\)|:)\s*([+-]?\d+(?:\.\d+)?)", line, re.I)
        if slack_match and result["critical_path"]["slack"] is None:
            val = float(slack_match.group(1))
            result["critical_path"]["slack"] = val
            if result["wns_ns"] is None or val < result["wns_ns"]:
                result["wns_ns"] = val

        start_match = re.search(r"Startpoint:\s*(\S+)", line, re.I)
        if start_match and not result["critical_path"]["startpoint"]:
            result["critical_path"]["startpoint"] = start_match.group(1)

        end_match = re.search(r"Endpoint:\s*(\S+)", line, re.I)
        if end_match and not result["critical_path"]["endpoint"]:
            result["critical_path"]["endpoint"] = end_match.group(1)

        group_match = re.search(r"Path Group:\s*(\S+)", line, re.I)
        if group_match and not result["critical_path"]["path_group"]:
            result["critical_path"]["path_group"] = group_match.group(1)

        if "VIOLATED" in line:
            result["violating_paths_count"] += 1

    if result["wns_ns"] is not None:
        result["status"] = "MET" if result["wns_ns"] >= 0 else "VIOLATED"

    return result
