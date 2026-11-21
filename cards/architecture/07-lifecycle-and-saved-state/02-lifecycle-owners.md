---
id: architecture-lifecycle-owners
topic: architecture/lifecycle
title: LifecycleOwner and observers
tags: [lifecycle, owner, observer]
related: [architecture-lifecycle-basics, architecture-lifecycle-aware-components]
sources:
  - https://developer.android.com/topic/libraries/architecture/lifecycle
---

## Explanation
A `LifecycleOwner` is an object with a lifecycle, such as an activity, fragment, or navigation entry, and a `LifecycleObserver` receives its state changes. Observers let a component react to `ON_START`, `ON_STOP`, and `ON_DESTROY` without the owner knowing what they do. This is the mechanism behind `lifecycleScope`, `repeatOnLifecycle`, and lifecycle-aware collection. Custom owners are rare but valid for things such as a custom view that needs its own lifecycle.

## Code
```kotlin
class LoggerObserver : DefaultLifecycleObserver {
    override fun onStart(owner: LifecycleOwner) = log("started")
    override fun onStop(owner: LifecycleOwner) = log("stopped")
}

lifecycle.addObserver(LoggerObserver())
```
