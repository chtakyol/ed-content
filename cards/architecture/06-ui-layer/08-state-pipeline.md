---
id: architecture-state-pipeline
topic: architecture/ui
title: The state production pipeline
tags: [ui, state, pipeline]
related: [architecture-combining-streams, architecture-lifecycle-aware-collection, flows-while-subscribed]
sources:
  - https://developer.android.com/topic/architecture/ui-layer/state-production
---

## Explanation
UI state production is a pipeline: inputs are events and data streams, a state holder applies logic, and the output is an observable UI state. Inputs can be one-shot calls, flows, or both, while outputs are Compose state or `StateFlow`. The pipeline should be lifecycle-aware so it stops consuming resources when the UI is not visible. Assembling it deliberately prevents the common tangle where a ViewModel launches work in `init`, mutates several fields, and hopes the UI observes them in the right order.

## Code
```kotlin
val uiState: StateFlow<NewsUiState> = repository
    .observeArticles()
    .map { NewsUiState(articles = it) }
    .stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5_000),
        NewsUiState(),
    )
```
