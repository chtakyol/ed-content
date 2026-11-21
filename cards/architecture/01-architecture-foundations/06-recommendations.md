---
id: architecture-recommendations
topic: architecture/foundations
title: How strongly to follow each recommendation
tags: [architecture, recommendations, priorities]
related: [architecture-layers, architecture-anti-patterns]
sources:
  - https://developer.android.com/topic/architecture/recommendations
---

## Explanation
The official architecture recommendations are graded as strongly recommended, recommended, or optional. Strong items such as a defined data layer, unidirectional data flow, screen-level ViewModels, lifecycle-aware collection, and processing events inside the ViewModel are treated as defaults. Recommended items such as Hilt, a domain layer in large apps, and one model per layer are adopted when complexity justifies them, while optional items cover naming conventions. The grades are guidance rather than rules, so a small app can keep data types in a `data` package and skip a domain layer without being wrong.

## Code
```kotlin
// Strongly recommended: single source of truth plus UDF.
val uiState: StateFlow<NewsUiState> = repository
    .getArticles()
    .map(::toUiState)
    .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), NewsUiState())
```
