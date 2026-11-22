---
id: navigation-navhost-and-destinations
topic: app-navigation/principles
title: NavHost and destinations
tags: [navigation, navhost, destinations]
related: [navigation-navcontroller, navigation-designing-a-graph]
sources:
  - https://developer.android.com/guide/navigation
---

## Explanation
`NavHost` is the composable or fragment that displays the current destination and swaps content when navigation changes. Each `composable` block registers a destination with a route and a content lambda. The host owns the graph, so destinations do not render each other directly; they call the controller and let the host decide what to show. Keep destination composables thin: read arguments, obtain the state holder, and delegate to a content composable. This makes each destination independently previewable and testable.

## Code
```kotlin
@Serializable data object ArticleListRoute
@Serializable data class ArticleRoute(val id: String)

NavHost(
    navController = navController,
    startDestination = ArticleListRoute,
) {
    composable<ArticleListRoute> {
        ArticleListScreen(onArticleClick = { id -> navController.navigate(ArticleRoute(id)) })
    }
    composable<ArticleRoute> { entry ->
        val route = entry.toRoute<ArticleRoute>()
        ArticleDetailScreen(route.id)
    }
}
```
