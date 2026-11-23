---
id: security-min-and-target-sdk
topic: security/code-quality
title: Keep minSdk and targetSdk honest
tags: [code, sdk, platform-version, masvs-code-1, maswe-0042]
related: [security-enforced-updates, security-dependency-vulnerabilities]
sources:
  - https://mas.owasp.org/MASWE/MASVS-CODE/MASWE-0042/
  - https://developer.android.com/google/play/requirements/target-sdk
---

## Explanation
`targetSdk` is not a formality: it selects which security behaviors the platform applies to your app, including scoped storage, notification permissions, PendingIntent mutability, and cleartext defaults. Running an old target means opting out of protections the OS would otherwise give you for free, which is MASWE-0042, while an old `minSdk` leaves users on unsupported platforms without security patches, MASWE-0041. Play requires new apps and updates to target a recent API level, and lint flags the gap as `ExpiredTargetSdkVersion`. Raise `targetSdk` on a schedule rather than in a panic, test the behavior changes it brings, and raise `minSdk` when the install base no longer justifies supporting unpatched devices.

## Code
```kotlin
// app/build.gradle.kts
android {
    compileSdk = 36
    defaultConfig {
        minSdk = 26          // no unpatched Android 7 devices
        targetSdk = 36       // opt in to current platform hardening
    }
    lint {
        error += "ExpiredTargetSdkVersion"
        warningsAsErrors += "OldTargetApi"
    }
}
```
