/**
 * SEMICONDUCTOR ENGINEERING COPILOT V4.0
 * Group G: Security, Governance, and IP Protection (61-70)
 * Group H: MCP Integration and Agent Collaboration (71-80)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// -------------------------------------------------------------
// Group G: Security, Governance, and IP Protection
// -------------------------------------------------------------

/** 61. Least-Privilege Enforcer */
function enforceLeastPrivilege(role, requestedAction, context = {}) {
  const rolePermissions = {
    'viewer': ['read_rtl', 'view_report', 'list_runs'],
    'designer': ['read_rtl', 'write_rtl', 'view_report', 'run_lint', 'run_sim'],
    'lead': ['read_rtl', 'write_rtl', 'view_report', 'run_lint', 'run_sim', 'run_synth', 'approve_req', 'approve_release'],
    'admin': ['*']
  };

  const allowed = rolePermissions[role] || [];
  const isAllowed = allowed.includes('*') || allowed.includes(requestedAction);

  return {
    role,
    requestedAction,
    authorized: isAllowed,
    reason: isAllowed ? 'Permission granted by role mapping' : `Action '${requestedAction}' not in role policy for '${role}'`
  };
}

/** 62. Command Allowlist Manager */
function validateCommandAllowlist(command, allowlist = ['verilator', 'iverilog', 'yosys', 'openroad', 'pytest', 'node']) {
  if (!command || typeof command !== 'string') {
    return { valid: false, reason: 'Command must be non-empty string' };
  }

  // Shell metacharacters check
  const dangerousChars = [';', '&&', '||', '`', '$', '|', '>', '<'];
  for (const char of dangerousChars) {
    if (command.includes(char)) {
      return { valid: false, command, reason: `Shell metacharacter '${char}' forbidden in command allowlist enforcement` };
    }
  }

  const baseBinary = command.trim().split(/\s+/)[0];
  const isAllowed = allowlist.includes(baseBinary);

  return {
    command,
    baseBinary,
    valid: isAllowed,
    reason: isAllowed ? 'Binary present in approved allowlist' : `Binary '${baseBinary}' not in approved execution allowlist`
  };
}

/** 63. Sensitive RTL Scanner */
function scanSensitiveRtl(code) {
  const sensitivePatterns = [
    { type: 'AES_KEY', regex: /aes_key\s*=\s*(?:128'h|['"]?)[0-9a-fA-F]{32,}/i },
    { type: 'PRIVATE_KEY', regex: /BEGIN (RSA|EC|OPENSSH) PRIVATE KEY/i },
    { type: 'HARDCODED_SECRET', regex: /password\s*=\s*["'][^"']+["']/i },
    { type: 'PROPRIETARY_TAG', regex: /CONFIDENTIAL\s+PROPRIETARY\s+NOT\s+FOR\s+DISCLOSURE/i }
  ];

  const findings = [];
  sensitivePatterns.forEach(p => {
    if (p.regex.test(code)) {
      findings.push({ type: p.type, severity: 'HIGH' });
    }
  });

  return {
    clean: findings.length === 0,
    findings,
    violationCount: findings.length
  };
}

/** 64. Secret Exposure Detector */
function detectSecrets(envOrConfig) {
  const exposed = [];
  const secretKeyRegex = /(API_KEY|SECRET|PASSWORD|TOKEN|AUTH_KEY|PRIVATE_KEY)/i;

  for (const [key, val] of Object.entries(envOrConfig)) {
    if (secretKeyRegex.test(key) && val && typeof val === 'string' && val.length > 5) {
      if (!val.startsWith('***') && !val.startsWith('ENC(')) {
        exposed.push({ key, maskedValue: val.substring(0, 2) + '***' });
      }
    }
  }

  return {
    secure: exposed.length === 0,
    exposedCount: exposed.length,
    exposed
  };
}

/** 65. IP Access Boundary Validator */
function validateIpAccessBoundary(filePath, allowedRoot) {
  const normalizedFile = path.resolve(filePath);
  const normalizedRoot = path.resolve(allowedRoot);

  const isWithin = normalizedFile.startsWith(normalizedRoot + path.sep) || normalizedFile === normalizedRoot;

  return {
    filePath: normalizedFile,
    allowedRoot: normalizedRoot,
    withinBoundary: isWithin,
    reason: isWithin ? 'Target path resides within authorized IP root' : 'PATH_TRAVERSAL_OR_OUT_OF_BOUNDS_ACCESS'
  };
}

/** 66. Artifact Classification Engine */
function classifyArtifact(content, metadata = {}) {
  const lower = (content || '').toLowerCase();
  let classification = 'PUBLIC';

  if (metadata.containsKeys || lower.includes('aes_core') || lower.includes('crypto_engine') || lower.includes('top_secret_asic')) {
    classification = 'RESTRICTED_IP';
  } else if (metadata.internal || lower.includes('internal use only') || lower.includes('proprietary')) {
    classification = 'CONFIDENTIAL';
  }

  return {
    classification,
    watermarkRequired: classification === 'RESTRICTED_IP',
    exportControlled: classification === 'RESTRICTED_IP'
  };
}

/** 67. Audit Log Tamper-Evidence Verifier */
function verifyAuditLogIntegrity(logEntries) {
  // logEntries is an array of { id, timestamp, action, prevHash, hash }
  if (!Array.isArray(logEntries) || logEntries.length === 0) {
    return { verified: true, count: 0 };
  }

  let prevExpectedHash = 'GENESIS';
  for (let i = 0; i < logEntries.length; i++) {
    const entry = logEntries[i];
    if (entry.prevHash !== prevExpectedHash) {
      return {
        verified: false,
        brokenIndex: i,
        reason: `Hash chain broken at index ${i}: expected prevHash ${prevExpectedHash}, got ${entry.prevHash}`
      };
    }
    const computed = crypto.createHash('sha256')
      .update(`${entry.id}:${entry.timestamp}:${entry.action}:${entry.prevHash}`)
      .digest('hex');
    
    if (entry.hash !== computed) {
      return {
        verified: false,
        brokenIndex: i,
        reason: `Entry payload tampered at index ${i}: expected hash ${computed}, got ${entry.hash}`
      };
    }
    prevExpectedHash = entry.hash;
  }

  return {
    verified: true,
    count: logEntries.length,
    finalHash: prevExpectedHash
  };
}

/** 68. Approval Gate Enforcer */
function enforceApprovalGate(actionType, approvals = []) {
  const requirements = {
    'tapeout_release': { minApprovals: 2, roles: ['lead', 'signoff_mgr'] },
    'synthesis_prod': { minApprovals: 1, roles: ['lead', 'designer'] },
    'lint_run': { minApprovals: 0, roles: [] }
  };

  const req = requirements[actionType] || { minApprovals: 1, roles: ['lead'] };
  const validApprovals = approvals.filter(a => req.roles.length === 0 || req.roles.includes(a.role));

  const satisfied = validApprovals.length >= req.minApprovals;

  return {
    actionType,
    required: req.minApprovals,
    providedValid: validApprovals.length,
    gateOpen: satisfied,
    approvers: validApprovals.map(a => a.user)
  };
}

/** 69. Retention Policy Evaluator */
function evaluateRetentionPolicy(artifacts, policyDays = 30) {
  const now = Date.now();
  const msInDay = 86400000;
  const keep = [];
  const purge = [];

  artifacts.forEach(art => {
    const ageDays = (now - new Date(art.createdAt).getTime()) / msInDay;
    if (ageDays > policyDays && !art.pinned) {
      purge.push({ id: art.id, ageDays: Math.round(ageDays) });
    } else {
      keep.push({ id: art.id, ageDays: Math.round(ageDays), pinned: !!art.pinned });
    }
  });

  return {
    policyDays,
    retainedCount: keep.length,
    purgeCount: purge.length,
    purge
  };
}

/** 70. 3rd-Party License Auditor */
function auditThirdPartyLicenses(dependencies) {
  const approvedLicenses = ['MIT', 'Apache-2.0', 'BSD-3-Clause', 'ISC', 'CERN-OHL-P'];
  const riskyLicenses = ['GPL-3.0', 'AGPL-3.0', 'Proprietary-Unverified'];

  const compliant = [];
  const flagged = [];

  dependencies.forEach(dep => {
    if (approvedLicenses.includes(dep.license)) {
      compliant.push(dep.name);
    } else {
      flagged.push({ name: dep.name, license: dep.license, reason: riskyLicenses.includes(dep.license) ? 'COPYLEFT_RISK' : 'UNAPPROVED_LICENSE' });
    }
  });

  return {
    total: dependencies.length,
    compliantCount: compliant.length,
    flaggedCount: flagged.length,
    passed: flagged.length === 0,
    flagged
  };
}

// -------------------------------------------------------------
// Group H: MCP Integration and Agent Collaboration
// -------------------------------------------------------------

/** 71. MCP Protocol Negotiator */
function negotiateMcpProtocol(clientSupportedVersions, serverSupportedVersions) {
  const common = clientSupportedVersions.filter(v => serverSupportedVersions.includes(v));
  if (common.length === 0) {
    return { success: false, negotiatedVersion: null, error: 'NO_COMPATIBLE_MCP_VERSION' };
  }
  // Choose highest semantic or sorted version
  common.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  return {
    success: true,
    negotiatedVersion: common[0],
    availableVersions: common
  };
}

/** 72. MCP Capability Manifest Generator */
function generateMcpManifest(tools) {
  return {
    mcpVersion: '2024-11-05',
    vendor: 'semiconductor-engineering-copilot',
    capabilities: {
      tools: tools.reduce((acc, t) => {
        acc[t.name] = {
          description: t.description || 'EDA tool wrapper',
          parameters: t.parameters || {}
        };
        return acc;
      }, {})
    },
    toolCount: tools.length
  };
}

/** 73. Tool Input Sanitizer */
function sanitizeToolInput(params, schema = {}) {
  const sanitized = {};
  for (const [key, val] of Object.entries(params)) {
    if (typeof val === 'string') {
      // Strip potential command injection characters
      sanitized[key] = val.replace(/[;&|`$]/g, '').trim();
    } else {
      sanitized[key] = val;
    }
  }
  return {
    original: params,
    sanitized,
    modified: JSON.stringify(params) !== JSON.stringify(sanitized)
  };
}

/** 74. Output Provenance Tracker */
function trackOutputProvenance(toolName, inputs, outputs, agentId) {
  const hash = crypto.createHash('sha256')
    .update(`${toolName}:${JSON.stringify(inputs)}:${JSON.stringify(outputs)}:${agentId}`)
    .digest('hex');

  return {
    provenanceId: `prov_${hash.substring(0, 12)}`,
    toolName,
    agentId,
    timestamp: new Date().toISOString(),
    inputDigest: crypto.createHash('md5').update(JSON.stringify(inputs)).digest('hex'),
    outputDigest: crypto.createHash('md5').update(JSON.stringify(outputs)).digest('hex'),
    signature: hash
  };
}

/** 75. Agent Handoff Contract Validator */
function validateAgentHandoff(handoffPayload) {
  const requiredFields = ['fromAgent', 'toAgent', 'context', 'taskObjective', 'artifacts'];
  const missing = requiredFields.filter(f => !handoffPayload[f]);

  return {
    valid: missing.length === 0,
    missingFields: missing,
    handoffId: handoffPayload.handoffId || `hnd_${Date.now()}`
  };
}

/** 76. Loop Prevention Guard */
function checkLoopPrevention(history, currentAction, maxRepeats = 3) {
  const recent = history.slice(-maxRepeats);
  const count = recent.filter(act => act === currentAction).length;

  const loopDetected = count >= maxRepeats;
  return {
    currentAction,
    recentCount: count,
    maxRepeats,
    loopDetected,
    decision: loopDetected ? 'HALT_EXECUTION_LOOP' : 'PROCEED'
  };
}

/** 77. Duplicate Execution Suppressor */
function suppressDuplicateExecution(recentExecutions, newJobHash, windowSeconds = 60) {
  const now = Date.now();
  const match = recentExecutions.find(exec => {
    return exec.hash === newJobHash && (now - exec.timestamp) / 1000 < windowSeconds;
  });

  return {
    duplicateFound: !!match,
    cachedResult: match ? match.result : null,
    action: match ? 'USE_CACHED_RESULT' : 'EXECUTE_NEW'
  };
}

/** 78. Adapter Conformance Test Engine */
function testAdapterConformance(adapter) {
  const requiredMethods = ['initialize', 'execute', 'healthCheck', 'shutdown'];
  const missingMethods = requiredMethods.filter(m => typeof adapter[m] !== 'function');

  return {
    conformant: missingMethods.length === 0,
    missingMethods,
    adapterName: adapter.name || 'UnnamedAdapter'
  };
}

/** 79. Tool Failure Recovery Engine */
function executeWithRecovery(toolFn, fallbackFn, retryCount = 1) {
  try {
    const res = toolFn();
    return { success: true, result: res, recovered: false };
  } catch (err) {
    if (retryCount > 0 && typeof fallbackFn === 'function') {
      try {
        const fallbackRes = fallbackFn();
        return { success: true, result: fallbackRes, recovered: true, originalError: err.message };
      } catch (fbErr) {
        return { success: false, error: fbErr.message, fallbackFailed: true };
      }
    }
    return { success: false, error: err.message, recovered: false };
  }
}

/** 80. Agent Decision Trace Logger */
function logDecisionTrace(agentId, decisionPoint, rationales, chosenOption) {
  return {
    traceId: `trc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    agentId,
    timestamp: new Date().toISOString(),
    decisionPoint,
    rationales,
    chosenOption,
    evidenceRecorded: true
  };
}

module.exports = {
  // Group G
  enforceLeastPrivilege,
  validateCommandAllowlist,
  scanSensitiveRtl,
  detectSecrets,
  validateIpAccessBoundary,
  classifyArtifact,
  verifyAuditLogIntegrity,
  enforceApprovalGate,
  evaluateRetentionPolicy,
  auditThirdPartyLicenses,
  // Group H
  negotiateMcpProtocol,
  generateMcpManifest,
  sanitizeToolInput,
  trackOutputProvenance,
  validateAgentHandoff,
  checkLoopPrevention,
  suppressDuplicateExecution,
  testAdapterConformance,
  executeWithRecovery,
  logDecisionTrace
};
