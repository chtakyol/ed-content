---
id: architecture-state-hoisting
topic: architecture/ui
title: State hoisting
tags: [ui, hoisting, compose]
related: [architecture-state-holders, architecture-ui-state]
sources:
  - https://developer.android.com/topic/architecture/ui-layer/stateholders
---

## Explanation
State hoisting moves state out of a composable so the caller owns it and passes it down as a value plus an event callback. The composable becomes stateless and reusable, while the owner decides where the state lives and how long it survives. Hoist to the lowest common owner that needs the state: a single composable for local UI state, a screen-level ViewModel for screen state, or a navigation graph for state shared across destinations. Hoisting too far makes APIs noisy; hoisting too little duplicates state.

## Code
```kotlin
@Composable
fun SearchField(
    query: String,
    onQueryChange: (String) -> Unit,
) { /* ... */ }

@Composable
fun SearchScreen(viewModel: SearchViewModel = viewModel()) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    SearchField(state.query, viewModel::onQueryChange)
}
```
