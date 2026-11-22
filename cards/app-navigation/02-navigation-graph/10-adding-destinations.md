---
id: navigation-adding-destinations
topic: app-navigation/graph
title: Adding a destination
tags: [navigation, workflow, destinations]
related: [navigation-designing-a-graph, navigation-destinations-and-routes]
sources:
  - https://developer.android.com/guide/navigation/design/add-new
---

## Explanation
Adding a destination is a small, repeatable workflow: define the route, add the destination to the graph, expose a navigate call from the place that should open it, and handle the arguments and back behavior. If the screen is reachable from outside the app, add a deep link and test it. If it belongs to a feature, put it in that feature's graph extension rather than the root graph. Finish by checking the back stack: entering the destination should not leave duplicate copies, and leaving it should return to the expected screen.

## Code
```kotlin
@Serializable data object AboutRoute

NavHost(navController, startDestination = SettingsRoute) {
    composable<SettingsRoute> {
        SettingsScreen(onAboutClick = { navController.navigate(AboutRoute) })
    }
    composable<AboutRoute> { AboutScreen() }
}
```
