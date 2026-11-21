---
id: architecture-lifecycle-aware-collection
topic: architecture/ui
title: Lifecycle-aware state collection
tags: [ui, lifecycle, flow, compose]
related: [architecture-repeat-on-lifecycle, architecture-state-pipeline, flows-state-flow]
sources:
  - https://developer.android.com/topic/architecture/ui-layer
---

## Explanation
Collecting a flow directly in composition keeps collecting while the composable is off-screen, wasting work and potentially updating state nobody can see. `collectAsStateWithLifecycle` ties collection to the host lifecycle, stops at `STOPPED`, and restarts when the screen returns. In non-Compose code, `repeatOnLifecycle` provides the same guarantee. This is the default way to consume a `StateFlow` from a ViewModel, and it matters most for flows backed by location, sensors, or network requests.

## Code
```kotlin
@Composable
fun NewsScreen(viewModel: NewsViewModel = viewModel()) {
    val uiState by viewModel.uiState
        .collectAsStateWithLifecycle()
    NewsList(uiState.articles)
}
```
