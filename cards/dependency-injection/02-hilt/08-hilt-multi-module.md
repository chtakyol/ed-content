---
id: di-hilt-multi-module
topic: dependency-injection/hilt
title: Hilt in multi-module projects
tags: [di, hilt, modularization]
related: [architecture-modularization, di-hilt-modules-and-bindings]
sources:
  - https://developer.android.com/training/dependency-injection/hilt-multi-module
---

## Explanation
In a multi-module project, each module can contribute Hilt bindings and entry points, and the application module assembles the graph. A feature module applies the Hilt plugin, installs its modules in the appropriate component, and exposes only the bindings its consumers need. Use `api` for types that appear in public constructors and `implementation` for internal details, otherwise consumers cannot resolve the graph. Avoid installing feature-specific bindings in the app module, because that recreates the central coupling modularization was meant to remove.

## Code
```kotlin
// feature/articles/build.gradle.kts
plugins {
    id("com.google.dagger.hilt.android")
    id("com.google.devtools.ksp")
}

dependencies {
    implementation(project(":core:data"))
    implementation("com.google.dagger:hilt-android:2.52")
    ksp("com.google.dagger:hilt-compiler:2.52")
}
```
