---
id: kotlin-generic-functions-and-classes
topic: kotlin/generics
title: Generic functions and classes
tags: [kotlin, generics, types]
related: [kotlin-type-bounds, kotlin-type-aliases]
sources:
  - https://kotlinlang.org/docs/generics.html
---

## Explanation
Generics let a function or class work with a type chosen by the caller while preserving that type in the signature. A type parameter is declared in angle brackets and can appear in parameters, return types, and properties. `List<T>` is the canonical example: the operations are written once, and the compiler still knows whether you have a `List<Article>` or a `List<User>`. In Android, generics show up in adapters, repository responses, `Result<T>`, and `StateFlow<T>`, where losing the type parameter would force casts at every use.

## Code
```kotlin
fun <T> List<T>.secondOrNull(): T? = getOrNull(1)

class Cache<T>(private val value: T) {
    fun get(): T = value
}
```
