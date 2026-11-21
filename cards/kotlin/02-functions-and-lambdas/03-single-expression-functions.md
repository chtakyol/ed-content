---
id: kotlin-single-expression-functions
topic: kotlin/functions
title: Single-expression functions
tags: [kotlin, functions, style]
related: [kotlin-functions, kotlin-when-expressions]
sources:
  - https://kotlinlang.org/docs/functions.html#single-expression-functions
---

## Explanation
When a function body is one expression, Kotlin lets you replace the block and `return` with `=`. The return type can usually be inferred, but writing it on public functions still documents the contract and catches accidental changes. Single-expression form works especially well with `when`, `if`, and collection pipelines, where the expression already describes the result. Use a block body when the function has several steps, local variables, or needs early returns, rather than contorting it into one line.

## Code
```kotlin
fun isEmpty(state: UiState): Boolean =
    state is UiState.Success && state.articles.isEmpty()

fun label(count: Int): String = when {
    count == 0 -> "Inbox zero"
    count < 10 -> "$count new"
    else -> "9+ new"
}
```
