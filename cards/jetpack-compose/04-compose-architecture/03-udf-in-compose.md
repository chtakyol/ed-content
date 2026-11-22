---
id: compose-udf-in-compose
topic: jetpack-compose/architecture
title: Unidirectional data flow in Compose
tags: [compose, architecture, udf]
related: [architecture-udf, compose-state-callbacks]
sources:
  - https://developer.android.com/develop/ui/compose/architecture
---

## Explanation
Unidirectional data flow in Compose means state flows down as parameters and events flow up as lambdas. A composable never mutates the state it receives; it calls a callback that the owner handles, and the owner produces a new state that flows back down. This makes the data path predictable and keeps UI code free of business rules. It also makes previews and tests simple, because a composable can be rendered with a fixed state and a no-op callback.

## Code
```kotlin
@Composable
fun ArticleScreen(state: ArticleUiState, onRefresh: () -> Unit) {
    when (state) {
        Loading -> CircularProgressIndicator()
        is Content -> ArticleList(state.articles, onRefresh)
        is Error -> RetryMessage(state.message, onRefresh)
    }
}
```
