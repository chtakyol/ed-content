---
id: architecture-ui-state
topic: architecture/ui
title: UI state
tags: [ui, state, immutability]
related: [architecture-ui-layer, architecture-udf]
sources:
  - https://developer.android.com/topic/architecture/ui-layer
---

## Explanation
UI state is an immutable description of everything the screen needs to render. It always exists, even when it is empty or loading, and it changes only through the state holder. Modeling it as a data class with defaults, or as a sealed hierarchy for mutually exclusive states, makes rendering exhaustive and prevents invalid combinations. The composable should be a pure function of this state, which also makes previews and UI tests straightforward.

## Code
```kotlin
data class NewsUiState(
    val articles: List<Article> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null,
)
```
