---
id: compose-effects-and-lifecycle
topic: jetpack-compose/lifecycle
title: Effects and the composition lifecycle
tags: [compose, lifecycle, effects]
related: [compose-entering-and-leaving, compose-side-effect]
sources:
  - https://developer.android.com/develop/ui/compose/lifecycle
---

## Explanation
Effects connect composables to the lifecycle of their composition. `LaunchedEffect` starts a coroutine when its key enters and cancels it when the key changes or the node leaves; `DisposableEffect` runs setup and guarantees `onDispose` on the way out; `SideEffect` runs after each successful composition. Because composables can enter and leave frequently, effects must be idempotent with respect to their keys and must clean up anything they register. Do not assume an effect runs once per screen, and do not put business logic in an effect that could run many times.

## Code
```kotlin
@Composable
fun ObserveLifecycle(lifecycleOwner: LifecycleOwner) {
    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event -> log(event) }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }
    }
}
```
