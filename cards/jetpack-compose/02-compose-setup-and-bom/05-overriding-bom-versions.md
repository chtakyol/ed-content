---
id: compose-overriding-bom-versions
topic: jetpack-compose/setup
title: Overriding BOM versions
tags: [compose, bom, versions]
related: [compose-bom, compose-bom-mapping]
sources:
  - https://developer.android.com/develop/ui/compose/bom
---

## Explanation
A BOM supplies recommended versions, but you can override a specific artifact when you need a newer fix or a version required by another library. Declare the artifact with an explicit version after the BOM, or use a resolution strategy, and document why the exception exists. Overriding one library can pull in transitive dependencies that no longer match the BOM, so check the dependency graph and remove the override once the BOM catches up. Treat overrides as temporary exceptions, not as a parallel version catalog.

## Code
```kotlin
dependencies {
    implementation(platform("androidx.compose:compose-bom:2025.01.00"))
    implementation("androidx.compose.ui:ui")
    // Temporary: needs a fix not yet in the BOM.
    implementation("androidx.compose.foundation:foundation:1.7.6")
}
```
