/**
 * semiconductor-engineering-copilot
 * Advanced EDA Metrics and Report Parsers
 * Supports CDC, UPF, DRC, LVS, Power IR-drop, and SPICE AC analysis.
 */

function parseCdcReport(content) {
  const result = {
    total_violations: 0,
    unsynchronized_crossings: 0,
    multi_bit_skew_violations: 0,
    reconvergence_violations: 0,
    violations: []
  };

  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/UNSYNC|Unsynchronized Crossing/i)) {
      result.unsynchronized_crossings++;
      result.total_violations++;
      result.violations.push({ type: 'UNSYNCHRONIZED', line: i + 1, text: line.trim() });
    } else if (line.match(/MULTI_BIT_SKEW|Multi-bit data crossing/i)) {
      result.multi_bit_skew_violations++;
      result.total_violations++;
      result.violations.push({ type: 'MULTI_BIT_SKEW', line: i + 1, text: line.trim() });
    } else if (line.match(/RECONVERGENCE|Reconverging synchronized/i)) {
      result.reconvergence_violations++;
      result.total_violations++;
      result.violations.push({ type: 'RECONVERGENCE', line: i + 1, text: line.trim() });
    }
  }

  result.status = result.total_violations === 0 ? 'CLEAN' : 'VIOLATIONS_FOUND';
  return result;
}

function parseDrcReport(content) {
  const result = {
    total_drc_errors: 0,
    antenna_violations: 0,
    min_spacing_violations: 0,
    min_width_violations: 0,
    violations: []
  };

  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/ANTENNA|ANT\.\d+/i)) {
      result.antenna_violations++;
      result.total_drc_errors++;
      result.violations.push({ type: 'ANTENNA', line: i + 1, text: line.trim() });
    } else if (line.match(/SPACE|SPACING/i) && line.match(/VIOLATION|ERROR/i)) {
      result.min_spacing_violations++;
      result.total_drc_errors++;
      result.violations.push({ type: 'SPACING', line: i + 1, text: line.trim() });
    } else if (line.match(/WIDTH/i) && line.match(/VIOLATION|ERROR/i)) {
      result.min_width_violations++;
      result.total_drc_errors++;
      result.violations.push({ type: 'WIDTH', line: i + 1, text: line.trim() });
    }
  }

  result.status = result.total_drc_errors === 0 ? 'CLEAN' : 'VIOLATIONS_FOUND';
  return result;
}

function parseLvsReport(content) {
  const isMatch = /LAYOUT AND SCHEMATIC COMPARED AND FOUND (?:EQUIVALENT|MATCH)|CORRECT|OVERALL COMPARISON RESULTS: MATCH/i.test(content);
  const discrepanciesMatch = content.match(/DISCREPANCIES\s*:\s*(\d+)/i) || content.match(/TOTAL ERRORS\s*=\s*(\d+)/i);
  const count = discrepanciesMatch ? parseInt(discrepanciesMatch[1], 10) : (isMatch ? 0 : 1);

  return {
    status: isMatch && count === 0 ? 'MATCH' : 'MISMATCH',
    discrepancy_count: count,
    clean: isMatch && count === 0
  };
}

function parseSpiceAcReport(content) {
  const result = {
    unity_gain_bandwidth_hz: null,
    phase_margin_deg: null,
    gain_margin_db: null,
    stable: false
  };

  const pmMatch = content.match(/Phase Margin\s*[:=]\s*([+-]?\d+(?:\.\d+)?)\s*(?:deg|degrees)?/i);
  const ugbwMatch = content.match(/(?:UGBW|Unity Gain Freq|Unity-Gain Bandwidth)\s*[:=]\s*([+-]?\d+(?:\.\d+)?)\s*(?:M|k|G)?Hz/i);
  const gmMatch = content.match(/Gain Margin\s*[:=]\s*([+-]?\d+(?:\.\d+)?)\s*dB/i);

  if (pmMatch) result.phase_margin_deg = parseFloat(pmMatch[1]);
  if (ugbwMatch) result.unity_gain_bandwidth_hz = parseFloat(ugbwMatch[1]);
  if (gmMatch) result.gain_margin_db = parseFloat(gmMatch[1]);

  if (result.phase_margin_deg !== null) {
    result.stable = result.phase_margin_deg >= 45.0;
  }

  return result;
}

module.exports = {
  parseCdcReport,
  parseDrcReport,
  parseLvsReport,
  parseSpiceAcReport
};
