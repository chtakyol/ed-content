---
id: compose-remember-updated-state
topic: jetpack-compose/side-effects
title: rememberUpdatedState
tags: [compose, effects, callbacks]
related: [compose-launched-effect, compose-state-callbacks]
sources:
  - https://developer.android.com/develop/ui/compose/side-effects
---

## Explanation
`rememberUpdatedState` keeps a reference to the latest value of a parameter without restarting a long-lived effect that captured an older one. This matters when an effect should keep running across recompositions but must call the newest callback, such as a timer that invokes `onTimeout` after several seconds. Without it, the effect captures the callback from the composition in which it started, which may be stale. Use it only for values that should not be effect keys; if a changed value should restart the effect, pass it as a key instead.

## Code
```kotlin
@Composable
fun Timer(onTimeout: () -> Unit) {
    val currentOnTimeout by rememberUpdatedState(onTimeout)

    LaunchedEffect(Unit) {
        delay(5_000)
        currentOnTimeout()   // latest callback, effect not restarted
    }
}
```
