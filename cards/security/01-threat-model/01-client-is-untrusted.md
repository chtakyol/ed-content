---
id: security-client-is-untrusted
topic: security/threat-model
title: The client is untrusted
tags: [threat-model, apk, reverse-engineering, basics]
related: [security-assets-and-attack-surface, security-defense-in-depth]
sources:
  - https://mas.owasp.org/MASVS/05-MASVS-STORAGE/
  - https://developer.android.com/privacy-and-security/security-best-practices
---

## Explanation
An APK is a readable zip of dex, resources, and native libraries. Anyone can unzip it, decompile it, repackage it, and run the result on a device they fully control, with a debugger attached and a proxy in front of the network. That means anything shipped in the app is public: keys, endpoints, business rules, feature flags, and "hidden" admin screens. It also means every input that crosses into the app can be forged. Design as if the attacker holds a rooted device and a copy of your code: keep secrets on the server, authorize on the server, and treat client-side checks as usability aids rather than security controls.

## Code
```text
Assume the attacker has:
  - the APK (jadx, apktool, Frida, mitmproxy)
  - root or a patched build
  - unlimited time and no rate limit

Therefore the server must enforce:
  - authentication and authorization for every request
  - price, quota, and role checks
  - replay protection and token binding
```
