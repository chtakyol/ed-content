---
id: navigation-safe-args
topic: app-navigation/using-the-graph
title: Safe Args
tags: [navigation, safe-args, arguments]
related: [navigation-type-safe-navigation, navigation-passing-data]
sources:
  - https://developer.android.com/guide/navigation/use-graph/safe-args
---

## Explanation
Safe Args is a Gradle plugin that generates direction and argument classes from the navigation graph, so navigation calls and argument reads are type-checked instead of using string keys. It was the standard way to make XML graphs type-safe before type-safe Compose routes. If you use type-safe routes with `@Serializable` classes, you generally do not need Safe Args for Compose destinations. In a mixed project, use one approach consistently per graph so argument contracts do not diverge.

## Code
```kotlin
// Generated from an XML graph with Safe Args.
val action = ArticleListDirections.actionArticleListToArticleDetail(articleId = "42")
navController.navigate(action)

// Type-safe Compose equivalent, without Safe Args.
navController.navigate(ArticleRoute("42"))
```
