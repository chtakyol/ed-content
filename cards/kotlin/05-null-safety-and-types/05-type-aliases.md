---
id: kotlin-type-aliases
topic: kotlin/null-safety
title: Type aliases
tags: [kotlin, types, readability]
related: [kotlin-generic-functions-and-classes, kotlin-functions]
sources:
  - https://kotlinlang.org/docs/type-aliases.html
---

## Explanation
A `typealias` gives a shorter or more meaningful name to an existing type without creating a new type at runtime. It is most useful for long generic signatures and function types, such as naming a `(Article) -> Unit` callback or a nested `Map<String, List<Article>>`. Aliases do not add type safety, because the compiler treats the alias and the underlying type as interchangeable. Use them to clarify intent at API boundaries, not to simulate distinct domain types; value classes are the tool for that.

## Code
```kotlin
typealias OnArticleClick = (Article) -> Unit
typealias ArticlesByCategory = Map<String, List<Article>>

fun bindClicks(handler: OnArticleClick) { /* ... */ }
```
