---
id: navigation-dialog-destinations
topic: app-navigation/graph
title: Dialog destinations
tags: [navigation, dialogs, destinations]
related: [navigation-destinations-and-routes, navigation-nested-graphs]
sources:
  - https://developer.android.com/guide/navigation/design/dialog-destinations
---

## Explanation
A dialog destination is part of the navigation graph but appears as a dialog over the current screen. Using the graph for dialogs keeps their arguments, back behavior, and deep links consistent with the rest of navigation, and lets the dialog be dismissed with the system Back gesture. In Compose, register it with the `dialog` builder from Navigation Compose. Use a dialog destination for modal flows that have their own route; use local `if (showDialog)` state for a simple confirmation that does not need to be navigated to.

## Code
```kotlin
NavHost(navController, startDestination = "articles") {
    composable("articles") { ArticleListScreen(navController) }
    dialog("filters") { FilterDialog(onApply = { navController.popBackStack() }) }
}
```
