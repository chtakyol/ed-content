---
id: navigation-navcontroller
topic: app-navigation/principles
title: NavController
tags: [navigation, navcontroller, back-stack]
related: [navigation-component, navigation-navigating-with-navcontroller]
sources:
  - https://developer.android.com/guide/navigation/navcontroller
---

## Explanation
`NavController` is the object that knows the current destination, the back stack, and the graph. You call `navigate` to move forward, `popBackStack` to go back, and observe the current destination or back stack to react to changes. It is scoped to a host: in Compose, `rememberNavController()` keeps it across recomposition, and with Views it lives in a `NavHostFragment`. Do not create a controller per screen or keep a reference outside its host, because the graph and back stack must remain in sync with the host's lifecycle.

## Code
```kotlin
val navController = rememberNavController()

Button(onClick = { navController.navigate("article/42") }) {
    Text("Open article")
}

Button(onClick = { navController.popBackStack() }) {
    Text("Back")
}
```
