---
id: kotlin-type-checks-and-casts
topic: kotlin/null-safety
title: Type checks and casts
tags: [kotlin, types, casting]
related: [kotlin-smart-casts, kotlin-generic-functions-and-classes]
sources:
  - https://kotlinlang.org/docs/typecasts.html
---

## Explanation
`is` checks whether a value is an instance of a type and enables a smart cast in the same branch. `as` performs an explicit cast and throws `ClassCastException` on failure, while `as?` returns null instead and is the safer choice when the type is uncertain. Casts are sometimes unavoidable at boundaries such as `Bundle`, `Intent`, or reflection, but frequent casts inside business logic usually signal a design that should use polymorphism or a sealed hierarchy. Prefer `filterIsInstance<T>()` over filtering plus casting when narrowing a collection.

## Code
```kotlin
val payload: Any = intent.extras?.get("article") ?: return
val article = payload as? Article ?: return

val titles = items.filterIsInstance<Article>().map { it.title }
```
