---
id: navigation-kotlin-dsl
topic: app-navigation/graph
title: The Kotlin DSL
tags: [navigation, dsl, graph]
related: [navigation-type-safe-navigation, navigation-encapsulating-the-graph]
sources:
  - https://developer.android.com/guide/navigation/design/kotlin-dsl
---

## Explanation
The Navigation Kotlin DSL builds graphs in code with `createGraph`, `navigation`, `composable`, and `activity` blocks, rather than XML. It is useful when the graph needs conditional destinations, feature-module contributions, or type-safe arguments. The DSL is checked by the compiler, but it is still code, so keep graph construction in a dedicated function instead of spreading it through UI files. For Compose, the `NavHost` builder is already a DSL; use the lower-level `createGraph` when you need to build or test a graph independently of a host.

## Code
```kotlin
val graph = createGraph(startDestination = "home") {
    composable("home") { HomeScreen() }
    navigation(startDestination = "settings/general", route = "settings") {
        composable("settings/general") { GeneralSettingsScreen() }
        composable("settings/about") { AboutScreen() }
    }
}
```
