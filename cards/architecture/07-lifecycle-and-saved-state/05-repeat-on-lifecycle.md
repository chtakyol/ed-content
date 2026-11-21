---
id: architecture-repeat-on-lifecycle
topic: architecture/lifecycle
title: repeatOnLifecycle
tags: [lifecycle, flow, collection]
related: [architecture-lifecycle-scope, architecture-lifecycle-aware-collection]
sources:
  - https://developer.android.com/topic/libraries/architecture/coroutines
---

## Explanation
`repeatOnLifecycle` runs a block when the lifecycle reaches a minimum state, cancels it when the lifecycle drops below that state, and restarts it when the state returns. It is the standard way to collect a flow only while a screen is visible without leaking the collection. In Compose, `collectAsStateWithLifecycle` wraps the same idea. Use `Lifecycle.State.STARTED` for UI updates so work pauses whenever the screen is no longer visible.

## Code
```kotlin
lifecycleScope.launch {
    repeatOnLifecycle(Lifecycle.State.STARTED) {
        viewModel.uiState.collect { render(it) }
    }
}
```
