---
id: compose-state-in-compose
topic: jetpack-compose/state
title: State in Compose
tags: [compose, state, snapshot]
related: [compose-mutable-state-of, compose-remember]
sources:
  - https://developer.android.com/develop/ui/compose/state
---

## Explanation
Compose observes snapshot state: when a composable reads a `State<T>` value, the runtime records the read, and a write schedules recomposition of the scopes that read it. `mutableStateOf` creates a writable state, and the `by` delegate lets you read and write it as a normal property. State changes should replace values rather than mutate shared objects, so the runtime can detect the change and compare old and new values. This is the mechanism behind the declarative model: state changes drive UI, not direct view updates.

## Code
```kotlin
@Composable
fun Counter() {
    val count = remember { mutableStateOf(0) }

    Button(onClick = { count.value++ }) {
        Text("Count: ${count.value}")
    }
}
```
