---
id: security-masvs-profiles
topic: security/threat-model
title: Choosing a MASVS profile
tags: [masvs, profiles, risk]
related: [security-masvs, security-defense-in-depth]
sources:
  - https://mas.owasp.org/Profiles/
  - https://mas.owasp.org/MASVS/03-Using_the_MASVS/
---

## Explanation
MASVS separates baseline controls from optional hardening so not every app has to fight the same battle. MAS-L1 is the baseline every app should meet and is mostly about not leaking data and not exposing components. MAS-L2 adds defense in depth for apps handling money, health data, or account takeover risk. MAS-R adds resilience against reverse engineering and tampering, and only makes sense where the app itself is the thing being protected, such as DRM, banking malware resistance, or anti-cheat. Pick the profile before writing code, write it into the threat model, and let it decide whether a control is a bug or a nice-to-have.

## Code
```text
Profile   Use when                          Example controls
MAS-L1    any app shipped to users          STORAGE-1, NETWORK-1, PLATFORM-1
MAS-L2    money, health, identity, content  + CRYPTO-1/2, AUTH-1/2, PLATFORM-2
MAS-R     app is the target of attackers    + RESILIENCE-1..4, CODE-4

Note: resilience controls are speed bumps, not guarantees.
```
