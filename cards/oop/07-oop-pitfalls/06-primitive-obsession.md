---
id: oop-primitive-obsession
topic: oop/pitfalls
title: Primitive obsession
tags: [oop, pitfalls, value-objects]
related: [oop-value-objects, kotlin-value-classes]
sources:
  - https://refactoring.guru/smells/primitive-obsession
---

## Explanation
Primitive obsession is modeling domain concepts as `String`, `Int`, or `Long` everywhere instead of giving them a type. It becomes easy to pass a user id where an article id is expected, to forget which units a duration uses, or to accept an invalid email because the compiler only sees `String`. A value class or a small value object puts the validation and the meaning in one place and makes the type system enforce the distinction. Use primitives at the edges, such as JSON and databases, and convert to domain types as soon as the data enters the app.

## Code
```kotlin
// Primitive: easy to mix up and impossible to validate centrally.
fun load(id: String, since: Long) { /* ... */ }

// Typed: the compiler prevents accidental swaps.
@JvmInline value class ArticleId(val value: String)
@JvmInline value class EpochMillis(val value: Long)

fun load(id: ArticleId, since: EpochMillis) { /* ... */ }
```
