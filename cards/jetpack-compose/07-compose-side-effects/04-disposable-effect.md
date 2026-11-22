---
id: compose-disposable-effect
topic: jetpack-compose/side-effects
title: DisposableEffect
tags: [compose, effects, cleanup]
related: [compose-effects-and-lifecycle, compose-side-effect]
sources:
  - https://developer.android.com/develop/ui/compose/side-effects
---

## Explanation
`DisposableEffect(key)` runs a setup block when it enters the composition and guarantees the returned `onDispose` block when the key changes or the composable leaves. It is the tool for paired resources: registering and unregistering a listener, binding and unbinding a service, or observing and removing a lifecycle observer. The key controls when the old instance is disposed and a new one is created. If the effect does not need cleanup, use `SideEffect` or `LaunchedEffect` instead; reaching for `DisposableEffect` without an `onDispose` is a smell.

## Code
```kotlin
@Composable
fun ConnectivityObserver(observer: ConnectivityObserver) {
    val lifecycleOwner = LocalLifecycleOwner.current

    DisposableEffect(lifecycleOwner, observer) {
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose {
            lifecycleOwner.lifecycle.removeObserver(observer)
        }
    }
}
```
