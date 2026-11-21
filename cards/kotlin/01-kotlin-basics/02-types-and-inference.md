---
id: kotlin-types-and-inference
topic: kotlin/basics
title: Types and type inference
tags: [kotlin, types, inference]
related: [kotlin-val-and-var, kotlin-nullable-types]
sources:
  - https://kotlinlang.org/docs/basic-syntax.html
  - https://kotlinlang.org/docs/types.html
---

## Explanation
Kotlin is statically typed, but the compiler infers the type from the initializer so you rarely repeat it. `val name = "Ada"` is a `String`, and `val count = 0` is an `Int`; the type is fixed even though it is not written. Keep explicit types on public API surfaces such as function parameters, return types, and exposed properties, where they document the contract, and let inference handle locals to avoid noise. Android code benefits from this because a repository property, a UI state field, or a lambda parameter documents its intent without ceremony.

## Code
```kotlin
val title = "Kotlin"          // inferred String
val count = 3                 // inferred Int

fun articleCount(articles: List<Article>): Int =
    articles.size            // explicit at the boundary
```
