---
id: architecture-convention-plugins
topic: architecture/modularization
title: Convention plugins
tags: [modularization, gradle, plugins]
related: [architecture-modularization, architecture-api-and-impl]
sources:
  - https://developer.android.com/topic/modularization/patterns
---

## Explanation
Convention plugins centralize repeated Gradle configuration, such as Kotlin and Compose setup, SDK versions, and common dependencies, in a `build-logic` module. Each module then applies a small plugin instead of copying the same block. This keeps module build files short, makes upgrades consistent, and prevents drift between features. The trade-off is an extra build-logic module and a learning curve for the team.

## Code
```kotlin
class AndroidFeatureConventionPlugin : Plugin<Project> {
    override fun apply(target: Project) = with(target) {
        pluginManager.apply("com.android.library")
        pluginManager.apply("org.jetbrains.kotlin.android")
        dependencies.add("implementation", libs.findLibrary("core.ktx").get())
    }
}
```
