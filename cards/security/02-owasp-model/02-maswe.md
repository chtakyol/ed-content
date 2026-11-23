---
id: security-maswe
topic: security/owasp-model
title: MASWE names the weakness
tags: [owasp, maswe, weaknesses, cwe]
related: [security-masvs, security-mastg]
sources:
  - https://mas.owasp.org/MASWE/
  - https://mas.owasp.org/MASWE/MASVS-STORAGE/MASWE-0001/
---

## Explanation
Where MASVS states a requirement, the Mobile Application Security Weakness Enumeration states the specific way apps fail it, and each weakness is mapped to the matching CWE. MASWE-0001 is sensitive data stored unencrypted in private storage, MASWE-0006 is sensitive data not excluded from backup, MASWE-0026 is unencrypted network traffic, MASWE-0032 is insecure intents. This middle layer is what makes findings actionable: "STORAGE-1 fails" is vague, while "MASWE-0006, session token included in cloud backup" points at a file and a fix. Cite the weakness ID in code review comments and security tickets so history stays searchable.

## Code
```text
Control            Weakness                      Typical cause
STORAGE-1     ->   MASWE-0001 unencrypted data   prefs/DataStore in plaintext
STORAGE-1     ->   MASWE-0004 hardcoded secrets  API key in BuildConfig
STORAGE-2     ->   MASWE-0006 backup inclusion   allowBackup with no rules
NETWORK-1     ->   MASWE-0026 cleartext traffic  http:// endpoint
PLATFORM-1    ->   MASWE-0032 insecure intents   exported + implicit
```
