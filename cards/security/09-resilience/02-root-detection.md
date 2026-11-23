---
id: security-root-detection
topic: security/resilience
title: Root detection is a speed bump
tags: [resilience, root, detection, masvs-resilience-1, maswe-0051]
related: [security-play-integrity, security-tamper-and-debug-checks, security-obfuscation-limits]
sources:
  - https://mas.owasp.org/MASWE/MASVS-RESILIENCE/MASWE-0051/
  - https://mas.owasp.org/MASTG/knowledge/android/MASVS-RESILIENCE/MASTG-KNOW-0027/
---

## Explanation
Root detection looks for `su` binaries, `test-keys` in build tags, writable system partitions, and known root-manager packages. All of it can be hidden by Magisk, Zygisk, or a custom kernel, and every check you write can be patched out of the APK, so MASWE-0051 is not something you ever fully satisfy. What root detection buys you is cost: it stops casual repackaging and scripted abuse, and it produces a signal worth combining with Play Integrity. Use it to raise friction, not to deny access outright, because rooted devices are also power users and QA testers. Log the signal to your risk engine, require step-up or restrict high-value features, and never store the decision in a flag the user can flip.

## Code
```kotlin
fun rootSignals(): Set<String> = buildSet {
    if (Build.TAGS?.contains("test-keys") == true) add("test-keys")
    listOf("/system/bin/su", "/system/xbin/su", "/sbin/su").forEach {
        if (File(it).exists()) add("su-binary")
    }
    runCatching { packageManager.getPackageInfo("com.topjohnwu.magisk", 0) }
        .onSuccess { add("magisk") }
} // Combine with Play Integrity; never trust this alone.
```
