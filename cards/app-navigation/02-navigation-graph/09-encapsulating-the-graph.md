---
id: navigation-encapsulating-the-graph
topic: app-navigation/graph
title: Encapsulating the graph
tags: [navigation, modularization, encapsulation]
related: [navigation-nested-graphs, architecture-modularization]
sources:
  - https://developer.android.com/guide/navigation/design/encapsulate
---

## Explanation
As an app grows, the navigation graph can become a central file that every feature edits, creating merge conflicts and hidden coupling. Encapsulate each feature's destinations in an extension function on `NavGraphBuilder`, expose only a route or a navigate lambda, and let the app module compose the feature graphs. This keeps a feature's internal routes private and lets the feature change its screens without touching the root graph. The tradeoff is indirection, so document the feature entry points and keep the root graph readable.

## Code
```kotlin
// feature/articles/src/main/.../ArticleNavigation.kt
fun NavGraphBuilder.articleGraph(navController: NavController) {
    composable<ArticleListRoute> { ArticleListScreen(navController::navigateToArticle) }
    composable<ArticleRoute> { entry -> ArticleDetailScreen(entry.toRoute<ArticleRoute>().id) }
}

// app module
NavHost(navController, startDestination = HomeRoute) {
    homeGraph(navController)
    articleGraph(navController)
    settingsGraph(navController)
}
```
