---
id: navigation-component
topic: app-navigation/principles
title: The Navigation component
tags: [navigation, navigation-component, overview]
related: [navigation-navcontroller, navigation-navhost-and-destinations]
sources:
  - https://developer.android.com/guide/navigation
---

## Explanation
The Navigation component models an app's destinations as a graph and provides a `NavController` to move between them. A destination is a screen, a dialog, or an activity, and the graph declares the routes and the connections between them. Navigation handles the back stack, arguments, deep links, and transitions consistently, so screens do not need to know which destination launched them. In Compose, the graph is built with the Navigation Compose APIs; with Views it is built from XML or the Kotlin DSL and hosted by a `NavHostFragment`.

## Code
```kotlin
val navController = rememberNavController()

NavHost(navController, startDestination = "articles") {
    composable("articles") { ArticleListScreen(navController) }
    composable("article/{id}") { ArticleDetailScreen() }
}
```
