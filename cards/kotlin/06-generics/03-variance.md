---
id: kotlin-variance
topic: kotlin/generics
title: Variance
tags: [kotlin, generics, variance]
related: [kotlin-generic-functions-and-classes, kotlin-star-projection]
sources:
  - https://kotlinlang.org/docs/generics.html#variance
---

## Explanation
Variance describes how a generic type relates to its type arguments: a `Producer<Article>` can be used where a `Producer<Any>` is expected, but only if the producer is declared with `out`. The `out` modifier makes a type parameter covariant and only usable in output positions, while `in` makes it contravariant and only usable in input positions. Java uses wildcards at the use site, whereas Kotlin usually declares variance once at the type or function level. In Android, `List<Article>` is covariant because `List` is declared with `out E`, so a list of articles can be passed to code expecting a list of `Any`.

## Code
```kotlin
interface Source<out T> {
    fun next(): T          // T only in output position
}

interface Consumer<in T> {
    fun accept(value: T)   // T only in input position
}
```
