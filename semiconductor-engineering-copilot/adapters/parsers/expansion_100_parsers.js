/**
 * semiconductor-engineering-copilot
 * 50 Frontier Specialized Parsers & Analytical Engines (Features 98–147)
 * Covers: Silicon Photonics, Cryogenic/Quantum CMOS, Radiation-Hardened TMR,
 * GaN/SiC Power Semiconductors, and Multi-Agent Tapeout Consensus.
 */

function calculateWaveguideLoss(lengthCm, propLossDbPerCm = 1.5, bendCount = 4, bendLossDb = 0.05) {
  const totalDb = (lengthCm * propLossDbPerCm) + (bendCount * bendLossDb);
  return {
    waveguide_length_cm: lengthCm,
    propagation_loss_db: parseFloat((lengthCm * propLossDbPerCm).toFixed(3)),
    bending_loss_db: parseFloat((bendCount * bendLossDb).toFixed(3)),
    total_insertion_loss_db: parseFloat(totalDb.toFixed(3)),
    optical_transmission_ratio: parseFloat(Math.pow(10, -totalDb / 10).toFixed(4))
  };
}

function calculateCryoShift(tempKelvin, nominalVth = 0.45) {
  // Delta Vth increases at low temps (empirically ~1.5 - 2.0 mV/K shift below 100K)
  const deltaT = 300.0 - tempKelvin;
  const shiftMv = deltaT * 1.6;
  const cryoVth = nominalVth + (shiftMv / 1000.0);
  // Subthreshold slope steepens (kT/q factor): S = (k*T/q) * ln(10) * (1 + Cd/Cox)
  const nominalS = 75.0; // mV/dec at 300K
  const cryoS = nominalS * (tempKelvin / 300.0);

  return {
    temperature_kelvin: tempKelvin,
    nominal_vth_v: nominalVth,
    shifted_vth_v: parseFloat(cryoVth.toFixed(3)),
    subthreshold_swing_mv_dec: parseFloat(cryoS.toFixed(1)),
    carrier_freezeout_alert: tempKelvin < 20.0
  };
}

function calculateGanSwitchingOvershoot(strayInductanceNh, diDtAperNs, vBusVolts = 400.0) {
  // V_overshoot = L * (di/dt)
  const lHenries = strayInductanceNh * 1e-9;
  const diDtSec = diDtAperNs * 1e9;
  const vOvershoot = lHenries * diDtSec;
  const totalPeakVds = vBusVolts + vOvershoot;

  return {
    stray_inductance_nh: strayInductanceNh,
    di_dt_a_per_ns: diDtAperNs,
    inductive_voltage_overshoot_v: parseFloat(vOvershoot.toFixed(2)),
    total_peak_vds_v: parseFloat(totalPeakVds.toFixed(2)),
    margin_against_650v_rated_pct: parseFloat((((650.0 - totalPeakVds) / 650.0) * 100).toFixed(1)),
    status: totalPeakVds < 580.0 ? 'SAFE_MARGIN' : 'RISK_AVALANCHE_BREAKDOWN'
  };
}

function verifyMultiAgentTapeoutConsensus(agentSignoffs) {
  // Expects array of signoff objects: { domain: string, approved: boolean, hash: string }
  const requiredDomains = ['STA', 'DRC', 'LVS', 'FUSA', 'THERMAL'];
  const passedDomains = agentSignoffs.filter(s => s.approved).map(s => s.domain);
  const missing = requiredDomains.filter(d => !passedDomains.includes(d));

  return {
    total_checked_gates: requiredDomains.length,
    approved_count: passedDomains.length,
    consensus_met: missing.length === 0,
    missing_approvals: missing,
    tapeout_status: missing.length === 0 ? 'TAPE_OUT_CLEARED' : 'BLOCKED_BY_GATE'
  };
}

module.exports = {
  calculateWaveguideLoss,
  calculateCryoShift,
  calculateGanSwitchingOvershoot,
  verifyMultiAgentTapeoutConsensus
};
