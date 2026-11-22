---
id: compose-composition
topic: jetpack-compose/mental-model
title: Composition
tags: [compose, composition, mental-model]
related: [compose-recomposition, compose-composable-functions]
sources:
  - https://developer.android.com/develop/ui/compose/mental-model
---

## Explanation
Composition is the tree of UI descriptions that Compose builds when it first runs your composables. Each call to a composable adds a node with its inputs, remembered values, and the code needed to update it. Compose manages the tree, not you: it decides which nodes exist, how they are grouped, and when they are discarded. Understanding composition explains why `remember` survives recomposition, why moving a composable changes its identity, and why effects are tied to entering and leaving the tree.

## Code
```kotlin
@Composable
fun App() {
    MaterialTheme {
        Surface {
            ArticleList()      // each call contributes to the composition
        }
    }
}
```
