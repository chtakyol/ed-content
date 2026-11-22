---
id: navigation-navigating-with-navcontroller
topic: app-navigation/using-the-graph
title: Navigating with NavController
tags: [navigation, navigate, navcontroller]
related: [navigation-navcontroller, navigation-navoptions-and-popupto]
sources:
  - https://developer.android.com/guide/navigation/use-graph/navigate
---

## Explanation
Call `navigate` with a route or a typed route object to move to a destination. The controller adds the destination to the back stack, resolves its arguments, and asks the host to render it. Navigate from event callbacks rather than during composition, so a recomposition does not repeat the navigation. If the destination is already current, repeated calls can create duplicate entries; use `launchSingleTop` or pop options to control that. After navigating, the back stack is the source of truth for where the user can return.

## Code
```kotlin
@Composable
fun ArticleListScreen(navController: NavController) {
    Button(onClick = { navController.navigate(ArticleRoute("42")) }) {
        Text("Open article")
    }
}
```
