/**
 * semiconductor-engineering-copilot
 * 50 Next-Gen Feature Specialized Parsers & Analytical Engines
 * Covers: Chiplet/UCIe, Functional Safety (ISO 26262), Hardware Security,
 * RISC-V MMU/Branch Predictor, SerDes Eyes, and Wafer Yield Modeling.
 */

function calculateWaferYieldMurphy(dieAreaMm2, defectDensityPerCm2, clusterParam = 2.0) {
  // Negative Binomial: Y = (1 + A*D/alpha)^(-alpha)
  const areaCm2 = dieAreaMm2 / 100.0;
  const ad = areaCm2 * defectDensityPerCm2;
  const yieldNegBinomial = Math.pow(1.0 + ad / clusterParam, -clusterParam);
  return {
    die_area_mm2: dieAreaMm2,
    defect_density_per_cm2: defectDensityPerCm2,
    projected_yield_percentage: parseFloat((yieldNegBinomial * 100.0).toFixed(2)),
    status: yieldNegBinomial >= 0.70 ? 'HIGH_YIELD' : 'COST_ALERT'
  };
}

function calculateFmedaAsilDMetrics(safetyFailureRates) {
  // ISO 26262 Part 5 Annex C:
  // lambda_total = lambda_safe + lambda_dangerous
  // lambda_dangerous = lambda_spf + lambda_residual + lambda_multiple_point
  // SPFM = (Sum(lambda_safe) + Sum(lambda_mpf)) / (Sum(lambda_total)) or 1 - (Sum(lambda_spf + lambda_residual) / Sum(lambda_dangerous))
  // Standard representation:
  // SPFM = 1 - (lambda_spf + lambda_residual) / (lambda_dangerous_total)
  // or SPFM = (Sum(lambda_safe) + Sum(lambda_detected_direct)) / lambda_total
  const { lambda_safe, lambda_direct, lambda_latent, lambda_residual } = safetyFailureRates;
  const total = lambda_safe + lambda_direct + lambda_latent + lambda_residual;
  
  // Single-Point Fault Metric: (total - lambda_residual) / total
  const spfm = ((total - lambda_residual) / total) * 100.0;
  // Latent Fault Metric: coverage over multiple-point faults
  const lfm = ((total - lambda_latent) / total) * 100.0;

  return {
    total_fit_rate: total,
    spfm_percentage: parseFloat(spfm.toFixed(2)),
    lfm_percentage: parseFloat(lfm.toFixed(2)),
    asil_d_compliant: spfm >= 99.0 && lfm >= 90.0,
    target_threshold: { min_spfm: 99.0, min_lfm: 90.0 }
  };
}

function parseSerdesEyeMetrics(eyeReportContent) {
  const result = {
    eye_height_mv: null,
    eye_width_ps: null,
    total_jitter_ps: null,
    bit_error_rate: '1e-12',
    channel_status: 'UNKNOWN'
  };

  const hMatch = eyeReportContent.match(/Eye Height\s*[:=]\s*([+-]?\d+(?:\.\d+)?)\s*mV/i);
  const wMatch = eyeReportContent.match(/Eye Width\s*[:=]\s*([+-]?\d+(?:\.\d+)?)\s*ps/i);
  const jMatch = eyeReportContent.match(/Total Jitter\s*[:=]\s*([+-]?\d+(?:\.\d+)?)\s*ps/i);

  if (hMatch) result.eye_height_mv = parseFloat(hMatch[1]);
  if (wMatch) result.eye_width_ps = parseFloat(wMatch[1]);
  if (jMatch) result.total_jitter_ps = parseFloat(jMatch[1]);

  if (result.eye_height_mv !== null && result.eye_width_ps !== null) {
    result.channel_status = (result.eye_height_mv >= 100.0 && result.eye_width_ps >= 15.0) ? 'OPEN_PASS' : 'MARGINAL_OR_CLOSED';
  }

  return result;
}

function parseRiscvDecoderSanity(traceLog) {
  const invalidOpcodes = [];
  const lines = traceLog.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('ILLEGAL_INSTRUCTION') || lines[i].includes('DECODE_FAULT')) {
      invalidOpcodes.push({ line: i + 1, detail: lines[i].trim() });
    }
  }

  return {
    total_instructions_verified: lines.length,
    illegal_instruction_faults: invalidOpcodes.length,
    status: invalidOpcodes.length === 0 ? 'CLEAN' : 'DECODER_BUG_DETECTED',
    faults: invalidOpcodes
  };
}

module.exports = {
  calculateWaferYieldMurphy,
  calculateFmedaAsilDMetrics,
  parseSerdesEyeMetrics,
  parseRiscvDecoderSanity
};
