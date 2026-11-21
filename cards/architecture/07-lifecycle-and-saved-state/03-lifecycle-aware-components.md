---
id: architecture-lifecycle-aware-components
topic: architecture/lifecycle
title: Lifecycle-aware components
tags: [lifecycle, components, android]
related: [architecture-lifecycle-owners, architecture-lifecycle-aware-collection]
sources:
  - https://developer.android.com/topic/libraries/architecture/lifecycle
---

## Explanation
Lifecycle-aware components observe a lifecycle instead of assuming when they are active. They start work when the owner reaches a suitable state and stop it when the owner leaves, which prevents leaks and background work for invisible screens. In Compose, effects such as `LifecycleStartEffect` and `LifecycleResumeEffect` provide the same behavior without overriding activity callbacks. The rule is simple: never keep a listener or collector alive based on a manual flag when the lifecycle can express the condition.

## Code
```kotlin
@Composable
fun LocationEffect(onLocation: (Location) -> Unit) {
    LifecycleStartEffect(Unit) {
        val handle = startLocationUpdates(onLocation)
        onStopOrDispose { handle.cancel() }
    }
}
```
