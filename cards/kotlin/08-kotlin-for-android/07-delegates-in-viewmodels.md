---
id: kotlin-delegates-in-viewmodels
topic: kotlin/android
title: Delegates in ViewModels
tags: [kotlin, android, viewmodel]
related: [kotlin-by-lazy, architecture-viewmodel]
sources:
  - https://developer.android.com/topic/libraries/architecture/viewmodel
  - https://developer.android.com/topic/libraries/architecture/viewmodel-savedstate
---

## Explanation
Property delegates let a ViewModel expose state without repeating getter and setter code. `by lazy` is useful for a dependency that is expensive to create but only needed on some paths, and a property backed by `SavedStateHandle` can read and write a saved value in one place. For observable screen state, prefer `MutableStateFlow` or Compose `mutableStateOf` rather than a custom observable delegate, because those types integrate with collection and recomposition. Whatever the choice, avoid caching an activity or view reference in it, since the ViewModel outlives those objects.

## Code
```kotlin
class SearchViewModel(
    private val repository: SearchRepository,
    savedState: SavedStateHandle,
) : ViewModel() {
    val query: StateFlow<String> =
        savedState.getStateFlow("query", "")

    fun onQueryChanged(value: String) {
        savedState["query"] = value
    }

    private val engine by lazy { SearchEngine() }
}
```
