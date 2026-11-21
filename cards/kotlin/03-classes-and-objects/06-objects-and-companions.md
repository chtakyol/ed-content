---
id: kotlin-objects-and-companions
topic: kotlin/classes
title: Objects and companion objects
tags: [kotlin, objects, singletons]
related: [oop-singletons, oop-factories]
sources:
  - https://kotlinlang.org/docs/object-declarations.html
---

## Explanation
An `object` declaration creates a single instance, which is useful for stateless utilities, shared constants, and simple singletons. A `companion object` is an object tied to a class that can hold factory methods and constants and can access the class's private members. Companion members are not static fields in the Java sense, but `@JvmStatic` exposes them to Java callers that way. Prefer constructor injection for dependencies and reserve objects for genuinely stateless or process-wide values; an object that holds mutable state is hard to test and easy to misuse.

## Code
```kotlin
class ArticleId private constructor(val value: String) {
    companion object {
        fun parse(raw: String): ArticleId = ArticleId(raw.trim())
    }
}

object Clock {
    fun now(): Long = System.currentTimeMillis()
}
```
