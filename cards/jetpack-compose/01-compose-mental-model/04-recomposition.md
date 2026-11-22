---
id: compose-recomposition
topic: jetpack-compose/mental-model
title: Recomposition
tags: [compose, recomposition, mental-model]
related: [compose-composition, compose-smart-recomposition]
sources:
  - https://developer.android.com/develop/ui/compose/mental-model
---

## Explanation
Recomposition is the process of re-running composables when their inputs change. Compose records which state each composable reads, so when that state changes, it schedules the smallest scopes that depend on it rather than rebuilding the whole screen. Recomposition can happen often and must be safe to repeat, which is why composables should not perform side effects directly. If a composable reads no changing state and receives stable inputs, Compose can skip it entirely.

## Code
```kotlin
@Composable
fun Counter() {
    var count by remember { mutableIntStateOf(0) }
    Button(onClick = { count++ }) {
        Text("Clicked $count times")   // only this scope recomposes
    }
}
```
