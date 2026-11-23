---
id: security-static-analysis
topic: security/verification
title: Static analysis of the release APK
tags: [verification, mobsf, apkanalyzer, masvs]
related: [security-dynamic-analysis, security-release-checklist, security-mastg]
sources:
  - https://mas.owasp.org/MASTG/
  - https://developer.android.com/studio/command-line/apkanalyzer
---

## Explanation
Test the artifact you ship, not the source tree: the APK has the merged manifest, the shrunk code, and whatever the build actually included. Start with an automated pass. MobSF decompiles the APK, flags exported components, weak crypto, insecure network settings, and hardcoded strings, and produces a report you can attach to a ticket. `apkanalyzer` answers the exact questions reviewers ask: what is exported, what permissions are requested, which libraries are inside, how large the method count is. Then read the interesting parts in jadx. Static analysis cannot prove the absence of a problem, but it reliably catches the boring ones, which are most of them.

## Code
```bash
# Full automated pass
docker run -it --rm -p 8000:8000 \
  opensecurity/mobile-security-framework-mobsf:latest

# Manifest and dependency facts, straight from the artifact
apkanalyzer manifest print app-release.apk
apkanalyzer manifest permissions app-release.apk
apkanalyzer dex packages app-release.apk | grep -c "^P"

# Read suspicious code paths
jadx -d jadx-out app-release.apk
```
