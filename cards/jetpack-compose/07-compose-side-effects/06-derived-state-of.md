---
id: compose-derived-state-of
topic: jetpack-compose/side-effects
title: derivedStateOf
tags: [compose, effects, state]
related: [compose-state-in-compose, compose-recomposition]
sources:
  - https://developer.android.com/develop/ui/compose/side-effects
---

## Explanation
`derivedStateOf` creates a state value computed from other state, and only reports a change when the computed result actually changes. This is useful when a frequently changing input produces a slowly changing output, such as a scroll position that maps to "show the back-to-top button." Without it, every scroll event would recompose the reader of the raw position. Do not use `derivedStateOf` for a simple transformation that is already cheap, and avoid it when the derived value is used only once; a plain calculation inside the composable is clearer.

## Code
```kotlin
val listState = rememberLazyListState()

val showButton by remember {
    derivedStateOf { listState.firstVisibleItemIndex > 0 }
}

if (showButton) {
    ScrollToTopButton(onClick = { /* scroll */ })
}
```
