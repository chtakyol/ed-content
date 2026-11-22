---
id: compose-setup
topic: jetpack-compose/setup
title: Setting up Compose
tags: [compose, setup, gradle]
related: [compose-compiler, compose-bom]
sources:
  - https://developer.android.com/develop/ui/compose/setup
---

## Explanation
A Compose project enables the Compose build feature, applies the Compose compiler plugin, and adds the UI, Material, tooling, and test dependencies. In a Kotlin 2.x project the compiler ships with Kotlin through the `org.jetbrains.kotlin.plugin.compose` plugin, so its version follows the Kotlin version. A minimal app needs `androidx.compose.ui:ui`, `androidx.compose.material3:material3`, and `androidx.activity:activity-compose`; previews and the interactive inspector come from the tooling artifacts. Keep Compose dependencies version-aligned with the BOM rather than pinning each library separately.

## Code
```kotlin
plugins {
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    buildFeatures { compose = true }
}

dependencies {
    implementation(platform("androidx.compose:compose-bom:2025.01.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.activity:activity-compose")
    debugImplementation("androidx.compose.ui:ui-tooling")
}
```
