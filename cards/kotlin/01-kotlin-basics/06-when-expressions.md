---
id: kotlin-when-expressions
topic: kotlin/basics
title: when expressions
tags: [kotlin, control-flow, when]
related: [kotlin-sealed-classes, kotlin-ranges-and-loops]
sources:
  - https://kotlinlang.org/docs/control-flow.html#when-expressions-and-statements
---

## Explanation
`when` is Kotlin's replacement for the classic `switch`, but it is an expression that returns a value and supports arbitrary conditions, ranges, and type checks. With a subject it matches values, and without a subject it evaluates boolean branches, which reads well for mapping several conditions to a result. When the subject is an enum or a sealed hierarchy, the compiler requires every branch to be covered, so adding a new subtype produces a compile error instead of a silent fallthrough. In Android, `when` is the normal way to render loading, success, and error UI states.

## Code
```kotlin
fun render(state: UiState): String = when (state) {
    UiState.Loading -> "Loading"
    is UiState.Success -> state.articles.first().title
    is UiState.Error -> state.message
}
```
