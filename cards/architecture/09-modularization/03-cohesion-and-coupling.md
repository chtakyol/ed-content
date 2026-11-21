---
id: architecture-cohesion-and-coupling
topic: architecture/modularization
title: High cohesion, low coupling
tags: [modularization, cohesion, coupling]
related: [architecture-api-and-impl, architecture-dependency-rules]
sources:
  - https://developer.android.com/topic/modularization/patterns
---

## Explanation
Good modules are highly cohesive and loosely coupled: everything that changes together lives together, and modules expose only what others need. A feature module that reaches into another feature's internals creates a hidden dependency and defeats the purpose of the split. Coupling is measured by what crosses the module boundary, so keep public APIs narrow and move shared code down into a core module instead of sideways between features. If two features constantly need each other, the boundary is probably in the wrong place.

## Code
```kotlin
// feature/news/build.gradle.kts
dependencies {
    implementation(project(":core:data"))
    implementation(project(":core:ui"))
    // No dependency on :feature:profile.
}
```
