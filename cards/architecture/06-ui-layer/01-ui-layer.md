---
id: architecture-ui-layer
topic: architecture/ui
title: What the UI layer does
tags: [ui, architecture, state]
related: [architecture-ui-state, architecture-udf]
sources:
  - https://developer.android.com/topic/architecture/ui-layer
---

## Explanation
The UI layer displays application data and is the primary point of user interaction. It is built from composables that render UI state and a state holder, usually a ViewModel, that produces that state and handles actions. The layer should contain UI logic such as formatting and visibility decisions, but not business rules or direct data access. Keeping it thin lets the same data layer feed phones, tablets, foldables, and other surfaces.

## Code
```kotlin
@Composable
fun NewsScreen(viewModel: NewsViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    NewsList(uiState.articles)
}
```
