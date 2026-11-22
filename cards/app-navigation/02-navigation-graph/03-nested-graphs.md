---
id: navigation-nested-graphs
topic: app-navigation/graph
title: Nested graphs
tags: [navigation, nested-graph, modularization]
related: [navigation-designing-a-graph, navigation-encapsulating-the-graph]
sources:
  - https://developer.android.com/guide/navigation/design/nested-graphs
---

## Explanation
A nested graph groups related destinations and gives them a shared route, so a whole flow can be navigated to, popped, or deep-linked as a unit. This is useful for onboarding, checkout, or a feature module with several screens. The nested graph can have its own start destination, and navigating to its route enters at that start. Use nesting to express ownership and to keep the root graph readable, not to hide a single screen behind an extra layer.

## Code
```kotlin
NavHost(navController, startDestination = "home") {
    composable("home") { HomeScreen() }
    navigation(startDestination = "checkout/cart", route = "checkout") {
        composable("checkout/cart") { CartScreen() }
        composable("checkout/payment") { PaymentScreen() }
        composable("checkout/confirm") { ConfirmScreen() }
    }
}
```
