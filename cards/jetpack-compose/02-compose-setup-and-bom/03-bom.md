---
id: compose-bom
topic: jetpack-compose/setup
title: The Compose BOM
tags: [compose, bom, versions]
related: [compose-bom-mapping, compose-overriding-bom-versions]
sources:
  - https://developer.android.com/develop/ui/compose/bom
---

## Explanation
The Compose Bill of Materials is a single dependency that pins compatible versions for all Compose libraries. Declare it with `platform()` and then omit versions from the individual Compose dependencies, so the BOM decides them together. This avoids the drift that happens when `ui`, `material3`, and `foundation` are upgraded separately and end up on incompatible versions. The BOM does not include non-Compose libraries such as `activity-compose` or navigation, so those still need explicit versions. Upgrading the BOM is the normal way to move the whole Compose stack forward.

## Code
```kotlin
dependencies {
    implementation(platform("androidx.compose:compose-bom:2025.01.00"))

    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.foundation:foundation")
    implementation("androidx.compose.material3:material3")
}
```
