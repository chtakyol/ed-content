---
id: solid-ui-vs-data-responsibilities
topic: solid/srp
title: UI vs data responsibilities
tags: [solid, srp, android]
related: [architecture-ui-layer, architecture-data-layer]
sources:
  - https://developer.android.com/topic/architecture
---

## Explanation
The UI layer decides what to show and how to react to input, while the data layer decides where data comes from and how it is stored. When those responsibilities blur, a composable starts calling a database or a repository starts building strings for a TextView, and neither can change independently. The boundary is not about folders; it is about who owns the decision. A ViewModel may map a domain model to a UI state, but it should not know SQL, and a repository may return a stream of models, but it should not know about a layout. This split is the Android expression of single responsibility at the layer level.

## Code
```kotlin
// Data layer: source of truth.
interface ArticleRepository {
    fun observe(): Flow<List<Article>>
}

// UI layer: presentation decision.
class ArticleViewModel(repository: ArticleRepository) : ViewModel() {
    val state = repository.observe()
        .map { ArticleUiState.Content(it) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), ArticleUiState.Loading)
}
```
