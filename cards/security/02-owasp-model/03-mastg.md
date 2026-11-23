---
id: security-mastg
topic: security/owasp-model
title: MASTG is how you verify it
tags: [owasp, mastg, testing, verification]
related: [security-masvs, security-maswe, security-control-mapping]
sources:
  - https://mas.owasp.org/MASTG/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-STORAGE/MASTG-TEST-0207/
---

## Explanation
The Mobile Application Security Testing Guide turns controls into concrete tests, split between static checks on the artifact and dynamic checks on a running app. Tests are numbered and grouped under the MASVS category they verify, for example MASTG-TEST-0207 for unencrypted data in the sandbox, MASTG-TEST-0216 for backup exposure, MASTG-TEST-0235 for cleartext configuration, MASTG-TEST-0028 for deep links, and MASTG-TEST-0030 for PendingIntent misuse. The guide also ships demos that show the vulnerable pattern next to the fix, and best practices such as MASTG-BEST-0063 for immutable PendingIntents. Quote the test ID in a QA ticket so verification is repeatable instead of opinion-based.

## Code
```bash
# Static: what does the artifact expose?
apkanalyzer manifest print app-release.apk
grep -r "http://" app/src/main/res/values/strings.xml

# Dynamic: what does it actually do at runtime?
adb shell run-as com.example.app ls -R files/
adb shell "run-as com.example.app cat shared_prefs/session.xml"
```
