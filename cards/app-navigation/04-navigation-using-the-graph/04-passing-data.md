---
id: navigation-passing-data
topic: app-navigation/using-the-graph
title: Passing data between destinations
tags: [navigation, arguments, state]
related: [navigation-destinations-and-routes, compose-where-to-hold-state]
sources:
  - https://developer.android.com/guide/navigation/use-graph/pass-data
---

## Explanation
Pass small, stable values as route arguments: an id, a filter, or a mode. The destination reads them from the route object or arguments and loads the rest from a repository. For values shared by several destinations in a flow, scope a `ViewModel` to the nested graph and read it from each destination. Avoid putting large objects or mutable state in a route, because routes are serialized, deep-linked, and saved across process death. Use `SavedStateHandle` when a destination needs to persist an argument or a small UI value.

## Code
```kotlin
@Serializable data class ArticleRoute(val id: String)

composable<ArticleRoute> { entry ->
    val id = entry.toRoute<ArticleRoute>().id
    val viewModel: ArticleViewModel = viewModel(factory = ArticleViewModel.factory(id))
    ArticleScreen(viewModel)
}
```
