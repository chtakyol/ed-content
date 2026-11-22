---
id: compose-architecture-overview
topic: jetpack-compose/architecture
title: Compose architecture
tags: [compose, architecture, state]
related: [compose-ui-and-state-holders, compose-udf-in-compose]
sources:
  - https://developer.android.com/develop/ui/compose/architecture
---

## Explanation
A Compose screen is easiest to reason about when it is split into UI and state holders. The UI renders immutable state and sends events upward; the state holder owns the logic and produces the next state. The state holder may be a `ViewModel` for screen-level state or a plain class remembered in composition for local state, but either way the composable does not fetch data or mutate business state directly. This is the same UI-layer pattern used by Views, expressed with composables and snapshot state.

## Code
```kotlin
@Composable
fun ArticleScreen(viewModel: ArticleViewModel) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    ArticleContent(state = state, onRefresh = viewModel::refresh)
}

@Composable
fun ArticleContent(state: ArticleUiState, onRefresh: () -> Unit) {
    // renders state, emits events
}
```
