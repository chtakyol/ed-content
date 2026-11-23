---
id: security-masvs
topic: security/owasp-model
title: What MASVS covers
tags: [owasp, masvs, standard, controls]
related: [security-maswe, security-mastg, security-masvs-profiles]
sources:
  - https://mas.owasp.org/MASVS/
---

## Explanation
The OWASP Mobile Application Security Verification Standard is the requirements half of the OWASP MAS project: eight categories and twenty-four controls describing what a secure mobile app must do, independent of platform and language. STORAGE covers data at rest, CRYPTO algorithms and key management, AUTH authentication and authorization, NETWORK transport and pinning, PLATFORM interaction with the OS and other apps, CODE build and dependency hygiene, RESILIENCE anti-tampering, and PRIVACY data minimization and consent. Each control has a stable identifier such as MASVS-STORAGE-1, so a requirement can be cited in a ticket, a PR checklist, or an audit report without ambiguity.

## Code
```text
MASVS v2 categories and controls (24 total)

STORAGE-1/-2      CRYPTO-1/-2        AUTH-1/-2/-3
NETWORK-1/-2      PLATFORM-1/-2/-3   CODE-1/-2/-3/-4
RESILIENCE-1..4   PRIVACY-1..4

Each control links to:
  weaknesses (MASWE-xxxx) -> tests (MASTG-TEST-xxxx) -> demos/tools
```
