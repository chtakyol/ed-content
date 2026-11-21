---
id: kotlin-functions
topic: kotlin/functions
title: Functions
tags: [kotlin, functions, basics]
related: [kotlin-default-and-named-arguments, kotlin-single-expression-functions]
sources:
  - https://kotlinlang.org/docs/functions.html
---

## Explanation
A Kotlin function is declared with `fun`, takes typed parameters, and declares a return type, with `Unit` as the implicit result when nothing is returned. Top-level functions are common, so a helper does not need to live inside a utility class, and member functions work the same way inside classes and objects. Keep functions small and name them after the outcome rather than the mechanism, for example `loadArticles()` instead of `callApi()`. In Android, suspend functions are the standard for asynchronous work and are declared with the same `fun` keyword plus `suspend`.

## Code
```kotlin
fun formatUnreadCount(count: Int): String =
    if (count == 0) "No unread" else "$count unread"

suspend fun loadArticles(): List<Article> =
    repository.articles()
```
