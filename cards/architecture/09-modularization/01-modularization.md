---
id: architecture-modularization
topic: architecture/modularization
title: Why modularize
tags: [modularization, architecture, build]
related: [architecture-module-types, architecture-granularity]
sources:
  - https://developer.android.com/topic/modularization
---

## Explanation
Modularization splits a codebase into separate Gradle modules with explicit dependencies. The main benefits are build parallelism and incremental compilation, enforced boundaries, independent ownership, and the ability to reuse or deliver features separately. A module is not free: each one adds build configuration, a public API to maintain, and navigation or DI wiring. Modularize when the boundary is meaningful, not just to reduce the number of files in one package.

## Code
```kotlin
// settings.gradle.kts
include(
    ":app",
    ":feature:news",
    ":core:data",
    ":core:ui",
)
```
