---
id: compose-state-callbacks
topic: jetpack-compose/state
title: State and callbacks
tags: [compose, state, callbacks]
related: [compose-state-hoisting, compose-remember-updated-state]
sources:
  - https://developer.android.com/develop/ui/compose/state-callbacks
---

## Explanation
A stateless composable receives state as values and reports user actions through callbacks, usually lambdas named after the event such as `onQueryChange` or `onArticleClick`. Passing stable lambdas helps Compose skip recomposition; a lambda that captures changing values is a new instance each time and may be treated as unstable. Hoist callbacks with the state they affect, and keep them free of business logic so they can be replaced in previews and tests. Use `rememberUpdatedState` when a long-lived effect must call the latest version of a callback without restarting.

## Code
```kotlin
@Composable
fun ArticleRow(
    article: Article,
    onClick: (Article) -> Unit,
) {
    Row(Modifier.clickable { onClick(article) }) {
        Text(article.title)
    }
}
```
