---
id: navigation-type-safe-navigation
topic: app-navigation/graph
title: Type-safe navigation
tags: [navigation, type-safety, serialization]
related: [navigation-destinations-and-routes, navigation-kotlin-dsl]
sources:
  - https://developer.android.com/guide/navigation/design/type-safety
---

## Explanation
Type-safe navigation models routes and arguments as Kotlin types instead of strings, using `@Serializable` classes and the Navigation Compose APIs. `composable<ArticleRoute>` receives the route type, `navigate(ArticleRoute(id))` checks the arguments at compile time, and `entry.toRoute<ArticleRoute>()` returns the parsed object. This removes string typos, manual argument keys, and most Safe Args boilerplate. It requires kotlinx.serialization, and route classes should stay small and stable because they become part of the navigation contract.

## Code
```kotlin
@Serializable data object ArticleListRoute
@Serializable data class ArticleRoute(val id: String)

NavHost(navController, startDestination = ArticleListRoute) {
    composable<ArticleListRoute> {
        ArticleListScreen(onClick = { id -> navController.navigate(ArticleRoute(id)) })
    }
    composable<ArticleRoute> { entry ->
        ArticleDetailScreen(entry.toRoute<ArticleRoute>().id)
    }
}
```
