---
id: compose-snapshot-flow
topic: jetpack-compose/side-effects
title: snapshotFlow
tags: [compose, effects, flow]
related: [compose-derived-state-of, compose-launched-effect]
sources:
  - https://developer.android.com/develop/ui/compose/side-effects
---

## Explanation
`snapshotFlow` turns a read of snapshot state into a `Flow` that emits when the observed value changes, with duplicate consecutive values conflated. It is the bridge from Compose state to flow operators, useful for debouncing a query, combining state with a repository stream, or triggering work after a value stabilizes. Collect it inside `LaunchedEffect` so the collection follows the composition. Reads that happen inside the `snapshotFlow` block are tracked; reads outside are not, so keep the block focused on the state you want to observe.

## Code
```kotlin
LaunchedEffect(listState) {
    snapshotFlow { listState.firstVisibleItemIndex }
        .distinctUntilChanged()
        .collect { index -> analytics.trackScroll(index) }
}
```
