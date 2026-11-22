---
id: compose-state-hoisting
topic: jetpack-compose/state
title: State hoisting
tags: [compose, state, hoisting]
related: [compose-state-callbacks, architecture-state-hoisting]
sources:
  - https://developer.android.com/develop/ui/compose/state-hoisting
---

## Explanation
State hoisting moves state out of a composable and into its caller, turning the composable into a stateless function that receives a value and emits events. This makes the component reusable, previewable, and testable, because the caller decides where the state lives. Hoist to the lowest common ancestor of the composables that need the state, and pass events back up as lambdas. A common pattern is a stateful wrapper that owns the state and a stateless inner composable that renders it, which keeps the rendering logic easy to exercise in isolation.

## Code
```kotlin
@Composable
fun SearchScreen() {
    var query by rememberSaveable { mutableStateOf("") }
    SearchField(query = query, onQueryChange = { query = it })
}

@Composable
fun SearchField(query: String, onQueryChange: (String) -> Unit) {
    TextField(value = query, onValueChange = onQueryChange)
}
```
