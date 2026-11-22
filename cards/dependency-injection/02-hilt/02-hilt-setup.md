---
id: di-hilt-setup
topic: dependency-injection/hilt
title: Hilt setup
tags: [di, hilt, setup]
related: [di-hilt-overview, di-hilt-components]
sources:
  - https://developer.android.com/training/dependency-injection/hilt-android
---

## Explanation
Hilt setup needs the Hilt Gradle plugin, the `hilt-android` runtime, and an annotation processor such as KSP or KAPT. Annotate the `Application` class with `@HiltAndroidApp` to generate the singleton component, then annotate Activities and Fragments that need injection with `@AndroidEntryPoint`. The plugin performs bytecode transformation for framework classes, so it must be applied in every module that uses Hilt entry points. Keep the Hilt version aligned across modules and prefer KSP for faster builds.

## Code
```kotlin
plugins {
    id("com.google.dagger.hilt.android")
    id("com.google.devtools.ksp")
}

dependencies {
    implementation("com.google.dagger:hilt-android:2.52")
    ksp("com.google.dagger:hilt-compiler:2.52")
}
```
