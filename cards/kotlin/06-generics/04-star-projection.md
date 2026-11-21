---
id: kotlin-star-projection
topic: kotlin/generics
title: Star projection
tags: [kotlin, generics, projection]
related: [kotlin-variance, kotlin-type-checks-and-casts]
sources:
  - https://kotlinlang.org/docs/generics.html#star-projections
---

## Explanation
A star projection such as `List<*>` means the type argument is unknown, and the compiler only allows operations that are safe for every possible argument. You can read elements as `Any?`, but you cannot add an element because the actual element type is unknown. Star projections are useful at boundaries where an API accepts a collection of unknown type, such as a serialization helper or a `Bundle` of mixed values. Every cast back to a concrete type is a promise that the caller, not the compiler, is enforcing, so keep those casts close to the boundary and validate before use.

## Code
```kotlin
fun summarize(values: List<*>): String =
    values.joinToString { it?.toString() ?: "null" }

val unknown: Map<String, *> = mapOf("count" to 3)
val count = unknown["count"] as? Int
```
