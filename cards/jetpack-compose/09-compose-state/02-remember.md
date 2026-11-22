---
id: compose-remember
topic: jetpack-compose/state
title: remember
tags: [compose, state, remember]
related: [compose-state-in-compose, compose-remember-and-recomposition]
sources:
  - https://developer.android.com/develop/ui/compose/state
---

## Explanation
`remember` keeps a value across recompositions by storing it in the composition. It is how a composable holds local state without recreating it on every run. The value is discarded when the composable leaves the composition, and it does not survive configuration changes or process death. Pass keys to reset the remembered value when an input changes, such as `remember(articleId) { ... }`. Use it for transient UI state and expensive objects that are cheap to recreate on screen recreation, not for state that must be persisted.

## Code
```kotlin
@Composable
fun ArticleScreen(articleId: String) {
    val scrollState = remember(articleId) {
        ScrollState(0)   // reset per article
    }
}
```
