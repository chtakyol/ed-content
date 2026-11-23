---
id: security-release-checklist
topic: security/verification
title: A release checklist that fits on a page
tags: [verification, checklist, release, masvs-l1]
related: [security-static-analysis, security-dynamic-analysis, security-control-mapping]
sources:
  - https://mas.owasp.org/MASVS/
  - https://mas.owasp.org/MASTG/checklists/
---

## Explanation
A security sign-off works when it is short, specific, and mapped to evidence. Take the MASVS profile you chose, list the controls that the release touches, and for each one name the test that proves it and the person who ran it. Keep it to the controls that can regress with this change: a payments release checks storage, crypto, auth, network, and platform, while a settings-only release checks platform and privacy. Record the APK hash so the approval refers to a specific artifact. The checklist is not a substitute for judgment, but it turns "looks fine to me" into "STORAGE-1 verified with MASTG-TEST-0207 on build 4f2c" which is what an incident review will ask for.

## Code
```text
release 7.3.0  sha256 4f2c...

control        test                       evidence
STORAGE-1      MASTG-TEST-0207            no plaintext token in files/
STORAGE-2      MASTG-TEST-0216            backup rules exclude session.xml
CRYPTO-1       MASTG-TEST-0013            AES-GCM only, no ECB
AUTH-1         MASTG-TEST-0018            biometric CryptoObject enforced
NETWORK-1      MASTG-TEST-0235            cleartext blocked, system CAs only
PLATFORM-1     MASTG-TEST-0029            exported components reviewed
PLATFORM-2     MASTG-TEST-0030            PendingIntents immutable
CODE-1         CI                         targetSdk current
```
