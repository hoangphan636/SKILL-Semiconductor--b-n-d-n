/**
 * semiconductor-engineering-copilot V3.0
 * Module A: Design Architecture and IP Intelligence (Capabilities 1-10)
 */

class DesignArchitectureModule {
  // 1. Specification Compiler
  compileSpecification(specMarkdown) {
    if (!specMarkdown || typeof specMarkdown !== 'string' || !specMarkdown.trim()) {
      return { status: 'ERROR', error: 'EMPTY_SPECIFICATION' };
    }
    const moduleMatch = specMarkdown.match(/module\s+([a-zA-Z0-9_]+)/i) || specMarkdown.match(/#\s*([a-zA-Z0-9_]+)/i);
    const moduleName = moduleMatch ? moduleMatch[1] : 'unnamed_module';
    const clockMatch = specMarkdown.match(/clock\s*:\s*([a-zA-Z0-9_]+)/i);
    const resetMatch = specMarkdown.match(/reset\s*:\s*([a-zA-Z0-9_]+)/i);
    const ports = [];
    const portRegex = /port\s*:\s*([a-zA-Z0-9_]+)\s*,\s*(input|output|inout)\s*,\s*(\[[0-9]+:[0-9]+\]|[0-9]+-bit|1-bit)/gi;
    let m;
    while ((m = portRegex.exec(specMarkdown)) !== null) {
      ports.push({ name: m[1], direction: m[2].toLowerCase(), width: m[3] });
    }
    return {
      status: 'COMPILED',
      module_name: moduleName,
      primary_clock: clockMatch ? clockMatch[1] : 'clk',
      primary_reset: resetMatch ? resetMatch[1] : 'rst_n',
      extracted_ports_count: ports.length,
      ports: ports
    };
  }

  // 2. RTL Interface Contract Checker
  checkInterfaceContract(sourceModule, sinkModule) {
    if (!sourceModule || !sinkModule) return { status: 'ERROR', error: 'MISSING_MODULE_SPECS' };
    const mismatches = [];
    for (const outPort of (sourceModule.outputs || [])) {
      const matchIn = (sinkModule.inputs || []).find(p => p.name === outPort.name);
      if (!matchIn) {
        mismatches.push({ port: outPort.name, issue: 'UNCONNECTED_IN_SINK' });
      } else if (matchIn.width !== outPort.width) {
        mismatches.push({ port: outPort.name, issue: 'BITWIDTH_MISMATCH', src_width: outPort.width, sink_width: matchIn.width });
      }
    }
    return {
      status: mismatches.length === 0 ? 'COMPLIANT' : 'CONTRACT_VIOLATION',
      mismatches_count: mismatches.length,
      mismatches: mismatches
    };
  }

  // 3. IP Reuse Advisor
  adviseIpReuse(functionalRequirement, ipCatalog) {
    if (!functionalRequirement || !Array.isArray(ipCatalog)) return { status: 'ERROR', error: 'INVALID_INPUT' };
    const reqLower = functionalRequirement.toLowerCase();
    const matches = [];
    for (const ip of ipCatalog) {
      const score = (ip.tags || []).filter(t => reqLower.includes(t.toLowerCase())).length;
      if (score > 0 || reqLower.includes(ip.name.toLowerCase())) {
        matches.push({ ip_name: ip.name, category: ip.category, confidence: Math.min(1.0, 0.4 + score * 0.3) });
      }
    }
    matches.sort((a, b) => b.confidence - a.confidence);
    return {
      status: 'EVALUATED',
      query: functionalRequirement,
      recommendation: matches.length > 0 ? 'REUSE_EXISTING_QUALIFIED_IP' : 'NEW_CLEANROOM_DESIGN_REQUIRED',
      candidates: matches
    };
  }

  // 4. Parameterized RTL Validator
  validateParameters(paramConfig, legalConstraints) {
    if (!paramConfig || !legalConstraints) return { status: 'ERROR', error: 'MISSING_PARAM_CONFIG' };
    const violations = [];
    for (const [key, rule] of Object.entries(legalConstraints)) {
      const val = paramConfig[key];
      if (val === undefined) {
        violations.push({ param: key, issue: 'UNDEFINED_REQUIRED_PARAMETER' });
      } else {
        if (rule.min !== undefined && val < rule.min) violations.push({ param: key, issue: 'BELOW_MINIMUM', value: val, min: rule.min });
        if (rule.max !== undefined && val > rule.max) violations.push({ param: key, issue: 'EXCEEDS_MAXIMUM', value: val, max: rule.max });
        if (rule.is_power_of_two && (val <= 0 || (val & (val - 1)) !== 0)) {
          violations.push({ param: key, issue: 'MUST_BE_POWER_OF_TWO', value: val });
        }
      }
    }
    return {
      status: violations.length === 0 ? 'VALID' : 'INVALID_CONFIGURATION',
      violations_count: violations.length,
      violations: violations
    };
  }

  // 5. Register Map Generator
  generateRegisterMap(regDefinitions, baseAddress = 0x1000) {
    if (!Array.isArray(regDefinitions)) return { status: 'ERROR', error: 'INVALID_REG_LIST' };
    let currentOffset = 0;
    const mapped = [];
    for (const reg of regDefinitions) {
      mapped.push({
        name: reg.name,
        offset_hex: `0x${(baseAddress + currentOffset).toString(16).toUpperCase()}`,
        access: reg.access || 'RW',
        reset_val_hex: reg.reset_hex || '0x00000000',
        description: reg.description || ''
      });
      currentOffset += 4; // 32-bit aligned
    }
    return {
      status: 'GENERATED',
      base_address: `0x${baseAddress.toString(16).toUpperCase()}`,
      total_registers: mapped.length,
      address_span_bytes: currentOffset,
      registers: mapped
    };
  }

  // 6. Memory Architecture Advisor
  adviseMemoryArchitecture(capacityBytes, portsRequired, targetFmaxMhz) {
    if (!capacityBytes || capacityBytes <= 0) return { status: 'ERROR', error: 'INVALID_CAPACITY' };
    let memType = 'DISTRIBUTED_LUTRAM';
    if (capacityBytes >= 2048 && capacityBytes < 131072) {
      memType = 'SINGLE_OR_DUAL_PORT_BRAM';
    } else if (capacityBytes >= 131072) {
      memType = 'SRAM_MACRO_OR_URAM';
    }
    return {
      status: 'RECOMMENDED',
      capacity_bytes: capacityBytes,
      ports: portsRequired || 1,
      target_fmax_mhz: targetFmaxMhz || 200,
      selected_primitive: memType,
      pipelining_stages_recommended: targetFmaxMhz > 500 ? 2 : 1
    };
  }

  // 7. Bus Protocol Compliance Assistant
  checkBusCompliance(protocolType, transactionSignals) {
    if (!protocolType || !transactionSignals) return { status: 'ERROR', error: 'MISSING_INPUTS' };
    const violations = [];
    if (protocolType.toUpperCase().includes('AXI')) {
      if (transactionSignals.valid && !transactionSignals.ready && transactionSignals.valid_deasserted) {
        violations.push({ rule: 'AXI_HANDSHAKE_STABILITY', detail: 'VALID dropped before READY handshake occurred' });
      }
      if (transactionSignals.address && (transactionSignals.address % 4 !== 0)) {
        violations.push({ rule: 'ALIGNMENT_WARNING', detail: 'Unaligned 32-bit boundary address' });
      }
    }
    return {
      status: violations.length === 0 ? 'COMPLIANT' : 'VIOLATIONS_FOUND',
      protocol: protocolType,
      violations: violations
    };
  }

  // 8. Clock and Reset Architecture Reviewer
  reviewClockResetArchitecture(clockDomains, resetNets) {
    if (!Array.isArray(clockDomains) || !Array.isArray(resetNets)) return { status: 'ERROR', error: 'INVALID_ARRAYS' };
    const warnings = [];
    if (clockDomains.length > 1) {
      warnings.push({ code: 'MULTI_DOMAIN_CDC_PRESENT', detail: `Detected ${clockDomains.length} asynchronous clock domains.` });
    }
    for (const rst of resetNets) {
      if (!rst.has_synchronizer) {
        warnings.push({ code: 'UNSYNCHRONIZED_RESET_DEASSERTION', net: rst.name });
      }
    }
    return {
      status: warnings.length === 0 ? 'CLEAN' : 'WARNINGS_DETECTED',
      clock_domains_count: clockDomains.length,
      warnings_count: warnings.length,
      warnings: warnings
    };
  }

  // 9. Design Complexity Estimator
  estimateComplexity(linesOfCode, moduleInstantiations, fsmStates) {
    const loc = Math.max(0, linesOfCode || 0);
    const inst = Math.max(0, moduleInstantiations || 0);
    const fsm = Math.max(0, fsmStates || 0);
    const score = loc * 0.1 + inst * 5.0 + fsm * 8.0;
    let tier = 'LOW';
    if (score > 500) tier = 'HIGH';
    else if (score > 150) tier = 'MEDIUM';
    return {
      status: 'ESTIMATED',
      raw_complexity_score: Math.round(score),
      complexity_tier: tier,
      estimated_verification_days: Math.max(1, Math.ceil(score / 50.0))
    };
  }

  // 10. Architecture Decision Records (ADR)
  generateAdr(adrTitle, context, decision, consequences) {
    if (!adrTitle || !decision) return { status: 'ERROR', error: 'TITLE_AND_DECISION_REQUIRED' };
    const dateStr = new Date().toISOString().split('T')[0];
    const adrMd = `# ADR: ${adrTitle}\n\n**Date**: ${dateStr}\n**Status**: APPROVED\n\n## Context\n${context || 'N/A'}\n\n## Decision\n${decision}\n\n## Consequences\n${consequences || 'None noted.'}\n`;
    return {
      status: 'CREATED',
      title: adrTitle,
      adr_markdown: adrMd
    };
  }
}

module.exports = { DesignArchitectureModule };
