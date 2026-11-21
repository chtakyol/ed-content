---
id: kotlin-value-classes
topic: kotlin/null-safety
title: Value classes
tags: [kotlin, types, performance]
related: [kotlin-type-aliases, oop-value-objects]
sources:
  - https://kotlinlang.org/docs/inline-classes.html
---

## Explanation
A `@JvmInline value class` wraps a single value to create a distinct domain type without the allocation of a normal wrapper in most cases. It is the right tool for ids, measurements, and other primitives that should not be interchangeable, such as `ArticleId` versus `UserId`. The compiler may box the value when it is used as a nullable type, a generic argument, or through an interface, so the zero-cost guarantee is not absolute. Validation can live in an `init` block, which makes an invalid instance impossible to construct.

## Code
```kotlin
@JvmInline
value class ArticleId(val value: String) {
    init {
        require(value.isNotBlank()) { "id must not be blank" }
    }
}

val id = ArticleId("article-1")
```
