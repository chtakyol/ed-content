---
id: navigation-navoptions-and-popupto
topic: app-navigation/using-the-graph
title: NavOptions and popUpTo
tags: [navigation, navoptions, back-stack]
related: [navigation-navigating-with-navcontroller, navigation-passing-data]
sources:
  - https://developer.android.com/guide/navigation/use-graph/navoptions
---

## Explanation
`NavOptions` controls how a navigation call changes the back stack. `popUpTo(route)` removes destinations above a route before adding the new one, and `inclusive = true` removes the target too, which is how a login or onboarding flow clears itself when finished. `launchSingleTop` avoids duplicate copies of the same destination, and `restoreState`/`saveState` preserve state across flows. Use these options instead of manually finishing activities, because they keep the graph and the system back stack consistent.

## Code
```kotlin
navController.navigate(HomeRoute) {
    popUpTo(LoginRoute) { inclusive = true }
    launchSingleTop = true
}
```
