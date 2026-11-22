---
id: compose-produce-state
topic: jetpack-compose/side-effects
title: produceState
tags: [compose, effects, state]
related: [compose-launched-effect, compose-state-in-compose]
sources:
  - https://developer.android.com/develop/ui/compose/side-effects
---

## Explanation
`produceState(initial, key)` converts a non-Compose source of data into a `State` owned by the composition. It starts a coroutine when it enters, exposes a `value` you can assign, and cancels the coroutine when the key changes or the composable leaves. It is handy for adapting a callback API or a suspend load into state without introducing a separate state holder. For a flow, `collectAsStateWithLifecycle` is usually more direct; use `produceState` when the source does not already expose a flow or snapshot state.

## Code
```kotlin
@Composable
fun rememberArticle(id: String): State<Article?> =
    produceState<Article?>(initialValue = null, id) {
        value = repository.load(id)
    }
```
