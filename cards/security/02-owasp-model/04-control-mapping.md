---
id: security-control-mapping
topic: security/owasp-model
title: Mapping a feature to controls
tags: [owasp, process, review, checklist]
related: [security-masvs, security-mastg, security-assets-and-attack-surface]
sources:
  - https://mas.owasp.org/MASVS/03-Using_the_MASVS/
  - https://mas.owasp.org/MASVS/04-Assessment_and_Certification/
---

## Explanation
The practical use of MASVS is a small table written when a feature is designed, not after it ships. Name the data the feature touches, the MASVS controls that apply, the weakness you are avoiding, and the test that will prove it later. A login screen maps to AUTH-1 and STORAGE-1 with MASTG-TEST-0018 and MASTG-TEST-0009; a share sheet maps to PLATFORM-1 and PLATFORM-2 with MASTG-TEST-0030. Keep the table in the PR description so reviewers can check the claim against the diff. When a control genuinely does not apply, write down why, because that justification is what an auditor will ask for.

## Code
```text
feature: "add card to wallet"

data            control        weakness      verify
PAN, expiry  -> STORAGE-1   -> MASWE-0001 -> MASTG-TEST-0207
biometric    -> AUTH-1      -> MASWE-0020 -> MASTG-TEST-0018
token refresh-> AUTH-3      -> MASWE-0024 -> MASTG-TEST-0017
add-to-wallet-> PLATFORM-2  -> MASWE-0036 -> MASTG-TEST-0008

not applicable: NETWORK-2 (no custom pinning, platform trust only)
```
