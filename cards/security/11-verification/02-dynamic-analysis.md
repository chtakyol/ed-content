---
id: security-dynamic-analysis
topic: security/verification
title: Watching the app at runtime
tags: [verification, frida, mitmproxy, masvs]
related: [security-static-analysis, security-network-security-config, security-tamper-and-debug-checks]
sources:
  - https://mas.owasp.org/MASTG/0x05b-Android-Security-Testing/
  - https://mas.owasp.org/MASTG/tools/
---

## Explanation
Runtime testing answers what static analysis cannot: does the token actually land in a plaintext file, does the app accept a proxy certificate, can the root check be bypassed in a minute. Run a debuggable build on a test device with `frida-server`, attach with objection, and try the standard attacks: dump the sandbox, disable pinning, detect root. Note that `run-as` only works on debuggable builds, which is a finding in itself if you planned to rely on it in production. Put the device behind mitmproxy with the debug-only trust override, and confirm every request is TLS with a valid chain. Use these techniques on your own app only, and record what you did so the next person can repeat it.

## Code
```bash
# Inspect runtime state (debuggable build)
adb shell run-as com.example.app ls -R files/ shared_prefs/
frida-ps -U

# Standard bypass attempts; note which ones succeed
objection -g com.example.app explore
#   android root detect
#   android sslpinning disable

# Intercept traffic
mitmproxy -p 8080
adb shell settings put global http_proxy 10.0.2.2:8080
```
