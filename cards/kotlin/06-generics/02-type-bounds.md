---
id: kotlin-type-bounds
topic: kotlin/generics
title: Type bounds
tags: [kotlin, generics, constraints]
related: [kotlin-generic-functions-and-classes, kotlin-variance]
sources:
  - https://kotlinlang.org/docs/generics.html#upper-bounds
---

## Explanation
An upper bound restricts a type parameter to a type or its subtypes, which lets the generic body use members of that bound. The common form is `<T : Comparable<T>>`, and a bound can be a class, an interface, or a type parameter. Kotlin supports only one upper bound in the angle brackets at a time, but a `where` clause can add several constraints. Bounds document the contract of a generic API and prevent callers from instantiating it with a type the implementation cannot handle. In Android, bounds are useful for generic adapters and for APIs that accept any `Parcelable` or `View`.

## Code
```kotlin
fun <T : Comparable<T>> List<T>.sortedAscending(): List<T> =
    sorted()

fun <T> T.logValue() where T : Any, T : Parcelable {
    Log.d("App", toString())
}
```
