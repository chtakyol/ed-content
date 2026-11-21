---
id: architecture-dependency-rules
topic: architecture/modularization
title: Module dependency rules
tags: [modularization, dependencies, gradle]
related: [architecture-module-types, architecture-cohesion-and-coupling]
sources:
  - https://developer.android.com/topic/modularization
---

## Explanation
Module dependencies must form a directed acyclic graph: no cycles, and arrows point from features toward core, never the reverse. Use `implementation` for dependencies that should not leak into a module's API and `api` only when a type from that dependency appears in the module's public signature. Enforce the intended graph in build scripts or with a lint or architecture test, because once a cycle appears Gradle cannot compile the project and the fix usually requires a new shared module.

## Code
```kotlin
// :core:ui exposes Compose types in its public API.
api("androidx.compose.ui:ui")

// :feature:news uses Retrofit only internally.
implementation("com.squareup.retrofit2:retrofit")
```
