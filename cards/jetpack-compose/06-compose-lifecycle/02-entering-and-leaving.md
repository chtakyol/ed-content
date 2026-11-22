---
id: compose-entering-and-leaving
topic: jetpack-compose/lifecycle
title: Entering and leaving composition
tags: [compose, lifecycle, identity]
related: [compose-composition-lifecycle, compose-remember]
sources:
  - https://developer.android.com/develop/ui/compose/lifecycle
---

## Explanation
Compose identifies a composable by its position in the composition, not by its function name alone. When a conditional branch stops emitting a composable, that node leaves and its remembered state and effects are discarded. When the same composable appears under a different key or in a different position, Compose may treat it as a new node and reset it. Use `key(...)` when a list of items can reorder, so each item keeps its own state. This identity model explains why state "disappears" after a `when` branch changes or an item moves.

## Code
```kotlin
@Composable
fun ArticleList(articles: List<Article>) {
    Column {
        articles.forEach { article ->
            key(article.id) {
                ArticleRow(article)   // state follows the id
            }
        }
    }
}
```
