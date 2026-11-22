---
id: navigation-destinations-and-routes
topic: app-navigation/graph
title: Destinations and routes
tags: [navigation, routes, destinations]
related: [navigation-navhost-and-destinations, navigation-actions-and-arguments]
sources:
  - https://developer.android.com/guide/navigation/design
---

## Explanation
A route identifies a destination in the graph. With string routes, the path can include placeholders such as `article/{id}` and optional query parameters; with type-safe navigation, a `@Serializable` class or object is the route. Routes should be stable identifiers owned by the navigation layer, not UI labels or database keys that can change. Avoid passing complex objects in a route: pass an id and let the destination load the data. Keep route definitions close to the graph and reuse them from tests and deep links.

## Code
```kotlin
// String route with an argument.
composable("article/{id}") { entry ->
    val id = entry.arguments?.getString("id")
    ArticleDetailScreen(id)
}

// Type-safe route.
@Serializable data class ArticleRoute(val id: String)
composable<ArticleRoute> { entry ->
    ArticleDetailScreen(entry.toRoute<ArticleRoute>().id)
}
```
