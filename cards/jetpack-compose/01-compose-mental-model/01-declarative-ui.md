---
id: compose-declarative-ui
topic: jetpack-compose/mental-model
title: Declarative UI
tags: [compose, declarative, mental-model]
related: [compose-composable-functions, compose-recomposition]
sources:
  - https://developer.android.com/develop/ui/compose/mental-model
---

## Explanation
Compose is declarative: you describe what the UI should look like for the current state, and the framework figures out how to update it. You do not find a view and mutate it; you write a function of state that produces UI, and when the state changes, Compose re-runs the relevant parts. This removes the manual synchronization between data and views that causes stale or duplicated UI in imperative code. The mental shift is to stop thinking in terms of "change this view" and start thinking in terms of "what should the screen be for this state."

## Code
```kotlin
@Composable
fun Counter(count: Int, onIncrement: () -> Unit) {
    Column {
        Text("Count: $count")
        Button(onClick = onIncrement) {
            Text("Increment")
        }
    }
}
```
