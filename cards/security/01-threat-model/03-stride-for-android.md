---
id: security-stride-for-android
topic: security/threat-model
title: STRIDE applied to Android
tags: [threat-model, stride, methodology]
related: [security-assets-and-attack-surface, security-defense-in-depth]
sources:
  - https://mas.owasp.org/MASTG/0x04b-Mobile-App-Security-Testing/
  - https://developer.android.com/privacy-and-security/security-best-practices
---

## Explanation
STRIDE gives six prompts that map cleanly onto mobile failures. Spoofing: another app sends an intent that looks like it came from your launcher, or a deep link impersonates a flow. Tampering: a repackaged APK, a modified local database, an edited request body. Repudiation: no server-side record of a sensitive action because the client logged it only locally. Information disclosure: plaintext tokens in prefs, secrets in logs, screenshots in Recents. Denial of service: an exported component that starts expensive work for anyone. Elevation of privilege: a `PendingIntent` handed to another app that grants your permissions. Walk each new feature through the six questions; most findings fall out of the first pass.

## Code
```text
feature: "share receipt"
S  who can invoke the target activity?        -> exported sharing activity
T  can the receipt amount be changed?         -> client-computed total
R  is the action recorded server-side?        -> no audit event
I  where is the receipt stored and logged?    -> cache + logcat
D  can a caller spam the share intent?        -> no rate limit
E  does the share PendingIntent carry grants? -> FLAG_MUTABLE + implicit
```
