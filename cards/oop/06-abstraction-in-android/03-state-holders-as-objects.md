---
id: oop-state-holders-as-objects
topic: oop/android
title: State holders as objects
tags: [oop, state-holder, android]
related: [architecture-state-holders, architecture-viewmodel]
sources:
  - https://developer.android.com/topic/architecture/ui-layer/state-holders
---

## Explanation
A state holder is an ordinary object that owns UI state and the logic that changes it, separate from the view that renders it. A ViewModel is the most common state holder in Android, but a plain class scoped to a composable or screen can be the right choice when the state does not need to survive configuration changes. Treating the state holder as an object means it has a clear constructor, dependencies, and public operations, so it can be tested without an activity. The view becomes a projection of the holder's state rather than the place where business rules accumulate.

## Code
```kotlin
class SearchStateHolder(
    private val repository: SearchRepository,
    private val scope: CoroutineScope,
) {
    private val _state = MutableStateFlow(SearchUiState())
    val state: StateFlow<SearchUiState> = _state

    fun onQueryChanged(query: String) {
        scope.launch {
            _state.value = SearchUiState(results = repository.search(query))
        }
    }
}
```
