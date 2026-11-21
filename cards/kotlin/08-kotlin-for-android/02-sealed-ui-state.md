---
id: kotlin-sealed-ui-state
topic: kotlin/android
title: Sealed UI state
tags: [kotlin, android, ui-state]
related: [kotlin-sealed-classes, architecture-ui-state]
sources:
  - https://developer.android.com/topic/architecture/ui-layer/state-production
---

## Explanation
A sealed interface is the standard way to model a screen that can be loading, showing data, or showing an error. Each state carries exactly the data it needs, so the success state holds articles and the error state holds a message, and the UI cannot read a field that does not apply. This replaces a data class full of nullable flags and prevents impossible combinations such as loading and error at the same time. Keep the state immutable and produce it in the ViewModel, then let the composable or view render one branch per subtype.

## Code
```kotlin
sealed interface ArticleUiState {
    data object Loading : ArticleUiState
    data class Content(val articles: List<Article>) : ArticleUiState
    data class Error(val message: String) : ArticleUiState
}

when (val state = viewModel.state) {
    ArticleUiState.Loading -> LoadingScreen()
    is ArticleUiState.Content -> ArticleList(state.articles)
    is ArticleUiState.Error -> ErrorScreen(state.message)
}
```
