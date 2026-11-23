---
id: security-app-signing
topic: security/resilience
title: Signing keys and Play App Signing
tags: [resilience, signing, release, masvs-resilience-1, maswe-0061]
related: [security-tamper-and-debug-checks, security-r8-and-build-hardening, security-play-integrity]
sources:
  - https://mas.owasp.org/MASTG/best-practices/MASTG-BEST-0006/
  - https://developer.android.com/privacy-and-security/security-best-practices
---

## Explanation
The signing key is the app's identity: whoever holds it can publish updates that your users will install. Two failures dominate. First, a release built with the debug signing config, which is a different identity per machine and cannot be updated. Second, the upload key kept on a laptop, lost or leaked, with no rotation path. Use Play App Signing so Google holds the app signing key and you keep a separate upload key that can be rotated, sign with the v2/v3 schemes, and verify the artifact before publishing with `apksigner verify`. MASWE-0061 covers debug artifacts left in the build, and a debug-signed release is the most expensive version of that mistake.

## Code
```bash
# Confirm scheme, key, and that it is not the debug key
apksigner verify --print-certs --verbose app-release.apk

# Fail CI when a release is debug-signed
if apksigner verify --print-certs app-release.apk | grep -q "CN=Android Debug"; then
  echo "release signed with debug key"; exit 1
fi
```
