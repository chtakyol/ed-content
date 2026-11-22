---
id: navigation-animated-transitions
topic: app-navigation/using-the-graph
title: Animated transitions
tags: [navigation, transitions, animation]
related: [navigation-navhost-and-destinations, compose-three-phases]
sources:
  - https://developer.android.com/guide/navigation/use-graph/animate-transitions
---

## Explanation
Navigation Compose supports enter, exit, pop-enter, and pop-exit transitions per destination or per `NavHost`. Transitions make the relationship between screens legible, such as a detail screen sliding in from the end while the list fades back. Define them with `AnimatedContentTransitionScope` and keep durations short enough to feel responsive. Do not animate every navigation, and respect the system's reduced-motion setting; a transition should clarify the hierarchy, not delay the user. Shared element transitions are available for stronger continuity between two destinations.

## Code
```kotlin
NavHost(
    navController = navController,
    startDestination = ListRoute,
    enterTransition = { slideIntoContainer(AnimatedContentTransitionScope.SlideDirection.Left) },
    exitTransition = { fadeOut() },
    popEnterTransition = { fadeIn() },
    popExitTransition = { slideOutOfContainer(AnimatedContentTransitionScope.SlideDirection.Right) },
) {
    composable<ListRoute> { ArticleListScreen(navController) }
    composable<ArticleRoute> { ArticleDetailScreen() }
}
```
