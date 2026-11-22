---
id: compose-launched-effect
topic: jetpack-compose/side-effects
title: LaunchedEffect
tags: [compose, effects, coroutines]
related: [compose-side-effect, compose-remember-coroutine-scope]
sources:
  - https://developer.android.com/develop/ui/compose/side-effects
---

## Explanation
`LaunchedEffect(key)` starts a coroutine when it enters the composition and cancels it when the key changes or the composable leaves. It is the right tool for work tied to a composable's lifetime, such as collecting a flow, showing a snackbar, or loading data when an id changes. The block is a suspend scope, so it can call suspend functions directly. Pass the values the effect depends on as keys; `Unit` means "run once per composition entry," and a changing key means "cancel the previous work and restart."

## Code
```kotlin
@Composable
fun ArticleScreen(articleId: String, repository: ArticleRepository) {
    var article by remember { mutableStateOf<Article?>(null) }

    LaunchedEffect(articleId) {
        article = repository.load(articleId)
    }
}
```
