---
id: security-r8-and-build-hardening
topic: security/code-quality
title: Harden the release build
tags: [code, r8, obfuscation, build-types, masvs-resilience-3, maswe-0061]
related: [security-obfuscation-limits, security-app-signing, security-dependency-vulnerabilities]
sources:
  - https://mas.owasp.org/MASWE/MASVS-RESILIENCE/MASWE-0061/
  - https://developer.android.com/build/shrink-code
---

## Explanation
Debug builds are not release builds, and the gap between them is where accidents happen: a `debuggable` flag left on, a logging library compiled in, source file names preserved, test endpoints bundled. MASWE-0061 covers debug artifacts that survive into production. Turn on R8 shrinking and resource shrinking for release, keep `isDebuggable = false`, and remove logging with the same rules that strip it rather than trusting developers to remember. R8 also renames classes, which raises the cost of reading your code, but do not confuse that with security: upload the mapping file to Play so crashes stay readable, and never let shrinking silently break reflection-based serialization.

## Code
```text
// app/build.gradle.kts
android {
    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            isDebuggable = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro",
            )
        }
    }
}

# proguard-rules.pro
-assumenosideeffects class android.util.Log {
    public static int d(...);
    public static int v(...);
}
```
