---
id: compose-smart-recomposition
topic: jetpack-compose/mental-model
title: Smart recomposition
tags: [compose, recomposition, performance]
related: [compose-recomposition, compose-declarative-ui]
sources:
  - https://developer.android.com/develop/ui/compose/mental-model
  - https://developer.android.com/develop/ui/compose/performance/stability
---

## Explanation
Compose tries to skip a composable during recomposition when its parameters are equal to the previous values and its types are stable. A stable type promises that public properties cannot change without notifying Compose, which lets the runtime compare inputs safely; `@Immutable` and `@Stable` are promises you can make explicitly. Unstable parameters, such as a mutable list or a lambda that captures changing values, can defeat skipping and cause more work than necessary. The practical rule is to pass immutable data and stable lambdas, and to measure before optimizing.

## Code
```kotlin
@Immutable
data class ArticleUiModel(
    val id: String,
    val title: String,
)

@Composable
fun ArticleRow(article: ArticleUiModel, onClick: (String) -> Unit) {
    Text(article.title, Modifier.clickable { onClick(article.id) })
}
```
