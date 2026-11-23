---
id: security-pen-test-scope
topic: security/verification
title: Scoping a mobile penetration test
tags: [verification, pentest, scope, masvs]
related: [security-release-checklist, security-static-analysis, security-control-mapping]
sources:
  - https://mas.owasp.org/MASVS/04-Assessment_and_Certification/
  - https://mas.owasp.org/MASTG/
---

## Explanation
A mobile test that only looks at the app will miss half the findings, and one that includes the whole backend will never finish. Write the scope around assets and flows: the app binary and its local data, authentication and session handling, the API endpoints the app calls, and the SDKs in the dependency graph. Name the MASVS profile so the tester knows whether resilience is in scope, provide one account per role plus a test payment method, and state which environments are fair game. Ask for findings mapped to MASWE with a reproduction and a suggested control, and require a retest of fixes on a specific build hash. Budget for the retest in the original statement of work.

## Code
```text
in scope
  Android app, release build, sha256 4f2c...
  staging API https://staging.example.com
  local storage, deep links, biometric flows, SDK traffic
  MASVS profile: L2 (no resilience testing)

out of scope
  production data, DoS, social engineering, third-party services

deliverable
  finding -> MASWE id, severity, steps, evidence, control, fix
  retest on fixed build within 30 days
```
