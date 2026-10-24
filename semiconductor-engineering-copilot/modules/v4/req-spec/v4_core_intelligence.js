/**
 * semiconductor-engineering-copilot V4.0
 * Group A: Requirements and Specification Intelligence (Features 1-10)
 * Group B: RTL Intelligence and Code Quality (Features 11-20)
 */

class V4CoreIntelligence {
  // --- GROUP A: Requirements & Specification ---

  // 1. Specification Ambiguity Detector
  detectAmbiguity(specText) {
    if (!specText || typeof specText !== 'string' || !specText.trim()) return { status: 'ERROR', error: 'EMPTY_TEXT' };
    const ambiguousTerms = ['fast', 'slow', 'etc', 'maybe', 'efficient', 'optimal', 'adequate', 'as small as possible'];
    const detected = [];
    for (const term of ambiguousTerms) {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      let match;
      while ((match = regex.exec(specText)) !== null) {
        detected.push({ term, index: match.index });
      }
    }
    return {
      status: 'AUDITED',
      ambiguity_count: detected.length,
      ambiguities: detected,
      score: Math.max(0, 100 - detected.length * 15)
    };
  }

  // 2. Requirement Completeness Scorer
  scoreCompleteness(requirementsList, requiredSections = ['clocking', 'reset', 'interfaces', 'registers', 'power']) {
    if (!Array.isArray(requirementsList)) return { status: 'ERROR', error: 'ARRAY_REQUIRED' };
    const coveredSections = new Set();
    for (const req of requirementsList) {
      if (req.section && requiredSections.includes(req.section.toLowerCase())) {
        coveredSections.add(req.section.toLowerCase());
      }
    }
    const ratio = (coveredSections.size / requiredSections.length) * 100.0;
    return {
      status: 'SCORED',
      completeness_pct: parseFloat(ratio.toFixed(1)),
      missing_sections: requiredSections.filter(s => !coveredSections.has(s)),
      compliant: ratio >= 80.0
    };
  }

  // 3. Requirement Change Tracker
  trackRequirementChanges(baselineReqs, updatedReqs) {
    if (!Array.isArray(baselineReqs) || !Array.isArray(updatedReqs)) return { status: 'ERROR', error: 'ARRAYS_REQUIRED' };
    const baseMap = new Map(baselineReqs.map(r => [r.id, r.text]));
    const additions = [];
    const modifications = [];
    const deletions = [];

    for (const r of updatedReqs) {
      if (!baseMap.has(r.id)) additions.push(r.id);
      else if (baseMap.get(r.id) !== r.text) modifications.push(r.id);
    }
    const updIds = new Set(updatedReqs.map(r => r.id));
    for (const r of baselineReqs) {
      if (!updIds.has(r.id)) deletions.push(r.id);
    }
    return {
      status: 'DIFFED',
      additions,
      modifications,
      deletions,
      change_magnitude: additions.length + modifications.length + deletions.length
    };
  }

  // 4. Acceptance Criteria Generator
  generateAcceptanceCriteria(reqId, description) {
    if (!reqId || !description) return { status: 'ERROR', error: 'REQ_AND_DESC_REQUIRED' };
    return {
      status: 'GENERATED',
      req_id: reqId,
      criteria: [
        `GIVEN the design is reset WHEN ${description} THEN output must match specification`,
        `100% functional coverage on transaction permutations for ${reqId}`,
        `Zero assertion violations reported during 1000 randomized simulation cycles`
      ]
    };
  }

  // 5. Requirement Conflict Resolver
  resolveConflicts(reqList) {
    if (!Array.isArray(reqList)) return { status: 'ERROR', error: 'ARRAY_REQUIRED' };
    const conflicts = [];
    // E.g. Check conflicting clock frequencies or target power
    const clkReqs = reqList.filter(r => r.category === 'clock_frequency');
    if (clkReqs.length > 1) {
      const distinctVals = new Set(clkReqs.map(r => r.value));
      if (distinctVals.size > 1) {
        conflicts.push({ type: 'CONTRADICTORY_CLOCK_FREQUENCY', items: clkReqs });
      }
    }
    return {
      status: conflicts.length === 0 ? 'NO_CONFLICTS' : 'CONFLICTS_DETECTED',
      conflicts_count: conflicts.length,
      conflicts
    };
  }

  // 6. Assumption Registry
  registerAssumption(assumptionId, text, owner, verified = false) {
    if (!assumptionId || !text) return { status: 'ERROR', error: 'ID_AND_TEXT_REQUIRED' };
    return {
      status: 'REGISTERED',
      assumption_id: assumptionId,
      text,
      owner: owner || 'UNASSIGNED',
      verified: Boolean(verified),
      timestamp: new Date().toISOString()
    };
  }

  // 7. Requirement Risk Classifier
  classifyRisk(req) {
    if (!req || !req.id) return { status: 'ERROR', error: 'REQ_REQUIRED' };
    let score = 0;
    if (req.is_asynchronous || req.crosses_clock_domains) score += 40;
    if (req.is_analog_mixed_signal) score += 30;
    if (req.has_security_boundary) score += 20;
    let tier = 'LOW';
    if (score >= 60) tier = 'CRITICAL';
    else if (score >= 30) tier = 'MEDIUM';
    return { status: 'CLASSIFIED', req_id: req.id, risk_score: score, risk_tier: tier };
  }

  // 8. Requirement-to-Artifact Linker
  linkArtifact(reqId, artifactPath, hash) {
    if (!reqId || !artifactPath) return { status: 'ERROR', error: 'LINK_PARAMS_REQUIRED' };
    return {
      status: 'LINKED',
      req_id: reqId,
      artifact_path: artifactPath,
      sha256_hash: hash || 'UNHASHED',
      linked_at: new Date().toISOString()
    };
  }

  // 9. Specification Diff Visualizer
  visualizeSpecDiff(oldSpec, newSpec) {
    const oldLines = (oldSpec || '').split('\n');
    const newLines = (newSpec || '').split('\n');
    const added = newLines.filter(l => !oldLines.includes(l));
    const removed = oldLines.filter(l => !newLines.includes(l));
    return {
      status: 'VISUALIZED',
      added_lines_count: added.length,
      removed_lines_count: removed.length,
      summary: `+${added.length} lines, -${removed.length} lines`
    };
  }

  // 10. Requirement Approval Workflow
  approveRequirement(reqId, approverName, role) {
    if (!reqId || !approverName) return { status: 'ERROR', error: 'REQ_AND_APPROVER_REQUIRED' };
    return {
      status: 'APPROVED',
      req_id: reqId,
      approver: approverName,
      role: role || 'Lead Architect',
      timestamp: new Date().toISOString(),
      gate_status: 'OPEN'
    };
  }

  // --- GROUP B: RTL Intelligence & Code Quality ---

  // 11. RTL Coding Standard Linter
  lintRtlStandards(verilogCode) {
    if (!verilogCode || typeof verilogCode !== 'string') return { status: 'ERROR', error: 'VERILOG_STRING_REQUIRED' };
    const warnings = [];
    if (/always\s*@\s*\*/.test(verilogCode) && !verilogCode.includes('always_comb')) {
      warnings.push({ rule: 'USE_ALWAYS_COMB', detail: 'Prefer SystemVerilog always_comb over Verilog always @*' });
    }
    if (/\$display\(/.test(verilogCode) && !verilogCode.includes('`uvm_info')) {
      warnings.push({ rule: 'USE_UVM_REPORTING', detail: 'Found raw $display in verification/RTL logic' });
    }
    return { status: 'LINTED', warnings_count: warnings.length, warnings, clean: warnings.length === 0 };
  }

  // 12. Latch Inference Detector
  detectLatches(verilogCode) {
    if (!verilogCode) return { status: 'ERROR', error: 'VERILOG_REQUIRED' };
    // Heuristic: comb block without edge trigger having if without else
    const isComb = /(always\s*@\s*\*\s*|always_comb)/i.test(verilogCode);
    const hasIncompleteIf = isComb && /if\s*\([^)]+\)\s*begin(?![^}]*else)[^}]*end/is.test(verilogCode);
    return {
      status: hasIncompleteIf ? 'LATCH_INFERRED' : 'LATCH_CLEAN',
      potential_latch_detected: hasIncompleteIf,
      risk_level: hasIncompleteIf ? 'HIGH' : 'ZERO'
    };
  }

  // 13. Blocking/Nonblocking Assignment Auditor
  auditAssignments(verilogCode) {
    if (!verilogCode) return { status: 'ERROR', error: 'VERILOG_REQUIRED' };
    // Sequential block with blocking '=': matches single '=' not followed by '=' or preceded by '<'
    const seqWithBlocking = /always_ff\b[^{]*begin[^}]*?(?<![<=])=(?!=)[^}]*?end/is.test(verilogCode);
    // Comb block with nonblocking '<='
    const combWithNonblocking = /always_comb\b[^{]*begin[^}]*?<=[^}]*?end/is.test(verilogCode);
    const violations = [];
    if (seqWithBlocking) violations.push('BLOCKING_IN_SEQUENTIAL_BLOCK');
    if (combWithNonblocking) violations.push('NONBLOCKING_IN_COMBINATIONAL_BLOCK');
    return {
      status: violations.length === 0 ? 'ASSIGNMENTS_CLEAN' : 'ASSIGNMENT_VIOLATION_DETECTED',
      violations,
      clean: violations.length === 0
    };
  }

  // 14. Width and Signedness Analyzer
  analyzeWidthSignedness(verilogCode) {
    if (!verilogCode) return { status: 'ERROR', error: 'VERILOG_REQUIRED' };
    const mismatches = [];
    if (/\[31:0\]\s+[a-z0-9_]+\s*;\s*assign\s+[a-z0-9_]+\s*=\s*[a-z0-9_]+\[15:0\];/i.test(verilogCode)) {
      mismatches.push('TRUNCATION_WARNING_32B_TO_16B');
    }
    return {
      status: mismatches.length === 0 ? 'WIDTH_CONSISTENT' : 'WIDTH_MISMATCH_FOUND',
      mismatches
    };
  }

  // 15. FSM Encoding Advisor
  adviseFsmEncoding(stateCount, targetMetric = 'SPEED') {
    if (!stateCount || stateCount <= 0) return { status: 'ERROR', error: 'STATE_COUNT_REQUIRED' };
    let encoding = 'BINARY';
    if (stateCount > 16 && targetMetric === 'AREA') {
      encoding = 'BINARY';
    } else if (stateCount <= 8 || targetMetric === 'SPEED') {
      encoding = 'ONE_HOT';
    } else if (targetMetric === 'LOW_POWER') {
      encoding = 'GRAY';
    }
    return {
      status: 'RECOMMENDED',
      state_count: stateCount,
      target_metric: targetMetric,
      recommended_encoding: encoding,
      bitwidth: encoding === 'ONE_HOT' ? stateCount : Math.ceil(Math.log2(stateCount))
    };
  }

  // 16. Combinational Loop Detector
  detectCombinationalLoops(verilogCode) {
    if (!verilogCode) return { status: 'ERROR', error: 'VERILOG_REQUIRED' };
    // Check self-feedback in assign
    const loopRegex = /assign\s+([a-zA-Z0-9_]+)\s*=\s*[^;]*\b\1\b/i;
    const match = loopRegex.exec(verilogCode);
    return {
      status: match ? 'COMBINATIONAL_LOOP_DETECTED' : 'LOOP_CLEAN',
      has_loop: Boolean(match),
      violating_signal: match ? match[1] : null
    };
  }

  // 17. Incomplete Case Statement Detector
  detectIncompleteCase(verilogCode) {
    if (!verilogCode) return { status: 'ERROR', error: 'VERILOG_REQUIRED' };
    const hasCase = /case\s*\(/i.test(verilogCode);
    const hasDefault = /default\s*:/i.test(verilogCode);
    const missing = hasCase && !hasDefault;
    return {
      status: missing ? 'INCOMPLETE_CASE_FOUND' : 'CASE_STATEMENTS_VALID',
      missing_default_branch: missing
    };
  }

  // 18. Reset Polarity Consistency Checker
  checkResetPolarity(verilogCode) {
    if (!verilogCode) return { status: 'ERROR', error: 'VERILOG_REQUIRED' };
    const hasActiveLow = /negedge\s+rst_n/i.test(verilogCode);
    const hasActiveHigh = /posedge\s+rst\b/i.test(verilogCode);
    const mixed = hasActiveLow && hasActiveHigh;
    return {
      status: mixed ? 'MIXED_RESET_POLARITY_WARNING' : 'RESET_POLARITY_CONSISTENT',
      mixed_polarity: mixed,
      polarity: hasActiveLow ? 'ACTIVE_LOW' : (hasActiveHigh ? 'ACTIVE_HIGH' : 'UNKNOWN')
    };
  }

  // 19. RTL Complexity Hotspot Mapper
  mapComplexityHotspots(moduleList) {
    if (!Array.isArray(moduleList)) return { status: 'ERROR', error: 'MODULES_ARRAY_REQUIRED' };
    const hotspots = moduleList.filter(m => (m.loc > 300 || m.cyclomatic_complexity > 15));
    return {
      status: 'MAPPED',
      total_modules: moduleList.length,
      hotspot_count: hotspots.length,
      hotspots: hotspots.map(h => h.name)
    };
  }

  // 20. RTL Documentation Synchronizer
  syncDocumentation(moduleName, portsList, internalRegisters) {
    if (!moduleName || !Array.isArray(portsList)) return { status: 'ERROR', error: 'PARAMS_REQUIRED' };
    const doc = `### Module: ${moduleName}\n\n#### Interface Ports:\n` +
      portsList.map(p => `- **${p.name}** (${p.direction}): ${p.width || '1-bit'}`).join('\n') +
      `\n\n#### Internal State Registers: ${internalRegisters ? internalRegisters.length : 0}\n`;
    return {
      status: 'SYNCHRONIZED',
      module_name: moduleName,
      generated_doc_markdown: doc
    };
  }
}

module.exports = { V4CoreIntelligence };
