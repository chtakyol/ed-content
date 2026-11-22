---
id: compose-choosing-a-layer
topic: jetpack-compose/architecture
title: Choosing a layer
tags: [compose, architecture, dependencies]
related: [compose-layer-model, compose-architecture-overview]
sources:
  - https://developer.android.com/develop/ui/compose/layering
---

## Explanation
Depend on the lowest Compose layer that gives you the behavior you need. A design-system module might use only foundation and UI so it is not tied to Material, while a feature screen can use Material components directly. Pulling Material into a foundational module makes it hard to change the design system later and increases the dependency surface of everything below. The same idea applies to `CompositionLocal` and runtime-only helpers: use the narrowest API, and keep application policy in the upper layers where it belongs.

## Code
```kotlin
// Design-system module: foundation + UI only.
dependencies {
    implementation("androidx.compose.foundation:foundation")
    implementation("androidx.compose.ui:ui")
}

// Feature module: may use Material components.
dependencies {
    implementation("androidx.compose.material3:material3")
}
```
