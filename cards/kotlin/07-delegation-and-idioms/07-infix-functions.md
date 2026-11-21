---
id: kotlin-infix-functions
topic: kotlin/idioms
title: Infix functions
tags: [kotlin, idioms, syntax]
related: [kotlin-scope-functions, kotlin-dsl-builders]
sources:
  - https://kotlinlang.org/docs/functions.html#infix-notation
---

## Explanation
An `infix` function can be called without a dot or parentheses, so `article matches query` reads more naturally than `article.matches(query)`. Infix functions must be members or extensions with exactly one parameter, and they are most effective for short, symmetric operations where the reading order is obvious. Avoid them for operations with side effects or unclear precedence, and never use them to make ordinary method calls look like keywords. Kotlin's standard library uses infix functions for `to`, `until`, `downTo`, and `step`, which is why ranges read the way they do.

## Code
```kotlin
infix fun Article.matches(query: String): Boolean =
    title.contains(query, ignoreCase = true) ||
        body.contains(query, ignoreCase = true)

val visible = articles.filter { it matches "kotlin" }
```
