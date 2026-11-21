---
id: architecture-combining-streams
topic: architecture/ui
title: Combining streams into UI state
tags: [ui, flow, combine, statein]
related: [architecture-state-pipeline, architecture-ui-state, flows-zip-combine]
sources:
  - https://developer.android.com/topic/architecture/ui-layer/state-production
---

## Explanation
When UI state depends on several streams, combine them into one state object instead of exposing several independent flows. `combine` emits whenever any source changes, so the screen always renders a consistent snapshot, and `stateIn` turns the result into a hot `StateFlow` with an initial value. Use `WhileSubscribed` when the pipeline should run only while the UI is visible. For one-shot sources, convert them into flows or keep them in a backing state that the combination observes.

## Code
```kotlin
val uiState = combine(
    repository.observeArticles(),
    settingsRepository.observeTheme(),
) { articles, theme ->
    NewsUiState(articles = articles, theme = theme)
}.stateIn(
    viewModelScope,
    SharingStarted.WhileSubscribed(5_000),
    NewsUiState(),
)
```
