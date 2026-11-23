---
id: security-obfuscation-limits
topic: security/resilience
title: What obfuscation actually buys
tags: [resilience, obfuscation, r8, masvs-resilience-3, maswe-0059]
related: [security-r8-and-build-hardening, security-root-detection, security-app-signing]
sources:
  - https://mas.owasp.org/MASWE/MASVS-RESILIENCE/MASWE-0059/
  - https://mas.owasp.org/MASTG/knowledge/android/MASVS-RESILIENCE/MASTG-KNOW-0033/
---

## Explanation
R8 renaming, string encryption, control-flow flattening, and native packing all raise the effort needed to read your app, and none of them makes a secret safe. MASWE-0059 is missing obfuscation, and the honest framing is cost: obfuscation buys time against casual analysis and pushes a determined attacker from an afternoon to a week. It cannot protect an API key, a signing key, or a business rule that matters, because the code that uses them must exist in readable form at some point. Spend the effort where it pays: rename and shrink with R8 as the default, avoid shipping debug symbols, and put the real protection in server-side authorization and attestation rather than in a packer that also breaks your crash reports.

## Code
```text
R8 (default, free)      renames classes/fields, shrinks unused code
String encryption       hides literals; strings still decrypt at runtime
Native obfuscation      raises analysis cost; adds crash/native bugs
Packers / RASP SDKs     vendor dependency, can be bypassed, costly

Rule of thumb: never rely on obfuscation for confidentiality.
Secrets belong on the server; the client only holds short-lived tokens.
```
