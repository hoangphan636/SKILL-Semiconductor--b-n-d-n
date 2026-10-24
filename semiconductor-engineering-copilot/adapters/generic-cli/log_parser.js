/**
 * semiconductor-engineering-copilot
 * Log Parser Adapter (Node.js runtime)
 * Parses raw simulator logs (VCS, Questa, Icarus, Verilator) and STA timing reports (PrimeTime, Tempus).
 */

function parseSimulationLog(logContent) {
  const result = {
    status: 'UNKNOWN',
    uvm_fatal_count: 0,
    uvm_error_count: 0,
    uvm_warning_count: 0,
    assertion_failures: 0,
    simulation_time: null,
    errors: []
  };

  const lines = logContent.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // UVM Error match
    if (line.includes('UVM_FATAL')) {
      result.uvm_fatal_count++;
      result.errors.push({ line: i + 1, text: line.trim() });
    } else if (line.includes('UVM_ERROR')) {
      result.uvm_error_count++;
      result.errors.push({ line: i + 1, text: line.trim() });
    } else if (line.includes('UVM_WARNING')) {
      result.uvm_warning_count++;
    }

    // Assertion failure
    if (line.match(/assertion.*failed/i) || line.includes('SVA error')) {
      result.assertion_failures++;
      result.errors.push({ line: i + 1, text: line.trim() });
    }

    // Time stamp match
    const timeMatch = line.match(/Simulation time:\s*(\d+\s*(?:ns|ps|us|ms))/i) || line.match(/Time:\s*(\d+\s*(?:ns|ps|us|ms))/i);
    if (timeMatch) {
      result.simulation_time = timeMatch[1];
    }
  }

  if (result.uvm_fatal_count > 0 || result.uvm_error_count > 0 || result.assertion_failures > 0) {
    result.status = 'FAILURE';
  } else if (logContent.includes('PASSED') || logContent.includes('TEST PASSED') || logContent.includes('Simulation finished')) {
    result.status = 'SUCCESS';
  }

  return result;
}

function parseTimingReport(reportContent) {
  const result = {
    status: 'UNKNOWN',
    wns_ns: null,
    tns_ns: null,
    violating_paths_count: 0,
    critical_path: {
      startpoint: null,
      endpoint: null,
      slack: null,
      path_group: null
    }
  };

  const lines = reportContent.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Slack line match
    const slackMatch = line.match(/slack\s*\((?:VIOLATED|MET)\)\s*([+-]?\d+(?:\.\d+)?)/i) || line.match(/slack\s*:\s*([+-]?\d+(?:\.\d+)?)/i);
    if (slackMatch && result.critical_path.slack === null) {
      const val = parseFloat(slackMatch[1]);
      result.critical_path.slack = val;
      if (result.wns_ns === null || val < result.wns_ns) {
        result.wns_ns = val;
      }
    }

    // Startpoint / Endpoint
    const startMatch = line.match(/Startpoint:\s*(\S+)/i);
    if (startMatch && !result.critical_path.startpoint) {
      result.critical_path.startpoint = startMatch[1];
    }

    const endMatch = line.match(/Endpoint:\s*(\S+)/i);
    if (endMatch && !result.critical_path.endpoint) {
      result.critical_path.endpoint = endMatch[1];
    }

    // Path Group
    const groupMatch = line.match(/Path Group:\s*(\S+)/i);
    if (groupMatch && !result.critical_path.path_group) {
      result.critical_path.path_group = groupMatch[1];
    }

    if (line.includes('VIOLATED')) {
      result.violating_paths_count++;
    }
  }

  if (result.wns_ns !== null) {
    result.status = result.wns_ns >= 0 ? 'MET' : 'VIOLATED';
  }

  return result;
}

module.exports = { parseSimulationLog, parseTimingReport };
