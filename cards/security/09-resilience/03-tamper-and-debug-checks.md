---
id: security-tamper-and-debug-checks
topic: security/resilience
title: Detect repackaging and patched builds
tags: [resilience, tampering, debugging, masvs-resilience-1, maswe-0063]
related: [security-app-signing, security-play-integrity, security-r8-and-build-hardening]
sources:
  - https://mas.owasp.org/MASWE/MASVS-RESILIENCE/MASWE-0063/
  - https://mas.owasp.org/MASTG/best-practices/MASTG-BEST-0007/
---

## Explanation
A repackaged APK is signed with a different key, and a debug build advertises itself as debuggable, so both are detectable. MASWE-0063 covers debug mechanisms that were not disabled and MASWE-0064 covers missing debugger detection. Check the signing certificate digest at runtime against the value you expect from Play App Signing, and refuse to serve sensitive data when it does not match, but remember the check itself can be patched, so pair it with Play Integrity on the server. Keep `android:debuggable` false in release, gate `Debug.isDebuggerConnected()` behind a cheap check rather than a loop, and never display the result as "hacked app detected" with instructions, because that just tells an attacker which check to remove.

## Code
```kotlin
fun isExpectedBuild(): Boolean {
    if ((applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE) != 0) return false
    if (Debug.isDebuggerConnected()) return false
    val certs = packageManager.getPackageInfo(
        packageName,
        PackageManager.GET_SIGNING_CERTIFICATES,
    ).signingInfo.apkContentsSigners
    return certs.any { sha256(it.toByteArray()).contentEquals(EXPECTED_CERT_SHA256) }
}
```
