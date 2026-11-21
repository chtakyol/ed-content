---
id: architecture-viewmodel
topic: architecture/viewmodel
title: What a ViewModel does
tags: [viewmodel, state-holder, architecture]
related: [architecture-viewmodel-lifecycle, architecture-state-holders]
sources:
  - https://developer.android.com/topic/libraries/architecture/viewmodel
---

## Explanation
A ViewModel is a state holder that survives configuration changes and is scoped to a `ViewModelStoreOwner`, typically a screen or navigation destination. It holds the UI state, handles user actions, and talks to the data or domain layer. It must not hold an activity, fragment, view, or context reference, because it outlives them and would leak. A ViewModel is not a replacement for the data layer; it should not contain persistence or networking logic.

## Code
```kotlin
class NewsViewModel(
    private val repository: NewsRepository,
) : ViewModel() {
    val uiState = repository.observeArticles()
        .map { NewsUiState(articles = it) }
        .stateIn(
            viewModelScope,
            SharingStarted.WhileSubscribed(5_000),
            NewsUiState(),
        )
}
```
