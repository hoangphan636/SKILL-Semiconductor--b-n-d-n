# Security & Disclosure Policy

## 🔒 Security Commitments

Semiconductor design involves sensitive customer IP, confidential standard cell libraries, and proprietary foundry PDK rules. This platform enforces strict security invariants:

1. **Zero PDK Exfiltration**: Commercial foundry PDKs (TSMC, Intel, Samsung, GF), DRC/LVS decks, and proprietary LEF/DEF/GDSII cell libraries must never be ingested or exported to external third-party endpoints.
2. **Local Execution**: All mock adapters, parsers, and verification engines execute strictly within local or authorized user environments.
3. **No Hardcoded Secrets**: Secrets, FlexLM license strings, and tokens must never be committed to repository history.

## 🛡️ Supported Versions

| Version | Supported          |
| :------ | :----------------- |
| 5.x.x   | :white_check_mark: |
| 4.x.x   | :white_check_mark: |
| < 4.0   | :x:                |

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability or confidential data leakage risk:
1. **Do NOT open a public GitHub issue.**
2. Report the vulnerability via private GitHub Security Advisory or email the core maintainers.
3. Include detailed steps to reproduce, affected versions, and potential impact.
4. Maintainers will acknowledge receipt within 48 hours and provide an estimated remediation timeline.
