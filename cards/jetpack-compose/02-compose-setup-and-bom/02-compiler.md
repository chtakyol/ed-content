---
id: compose-compiler
topic: jetpack-compose/setup
title: The Compose compiler
tags: [compose, compiler, kotlin]
related: [compose-setup, compose-bom]
sources:
  - https://developer.android.com/develop/ui/compose/setup
  - https://developer.android.com/develop/ui/compose/compiler
---

## Explanation
The Compose compiler transforms `@Composable` functions so the runtime can track composition, group scopes, and skip work. With Kotlin 2.0 and later it is shipped as a Kotlin compiler plugin, applied with `org.jetbrains.kotlin.plugin.compose`, and its version is tied to the Kotlin version. Before Kotlin 2.0 the compiler was versioned separately and had to be matched to Kotlin manually, which was a common source of build errors. Keep the plugin applied in every module that declares composables, including design-system and feature modules, and let the Kotlin version drive it.

## Code
```kotlin
// Root or module build file
plugins {
    id("org.jetbrains.kotlin.android") version "2.1.0"
    id("org.jetbrains.kotlin.plugin.compose") version "2.1.0"
}
```
