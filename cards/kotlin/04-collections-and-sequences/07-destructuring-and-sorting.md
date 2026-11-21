---
id: kotlin-destructuring-and-sorting
topic: kotlin/collections
title: Destructuring and sorting
tags: [kotlin, collections, sorting]
related: [kotlin-data-classes, kotlin-collection-types]
sources:
  - https://kotlinlang.org/docs/destructuring-declarations.html
  - https://kotlinlang.org/docs/collection-ordering.html
---

## Explanation
Data classes and maps support destructuring, so `val (id, title) = article` unpacks the first two components without naming the object. Maps destructure into key and value in a `for` loop, and `component1()`/`component2()` make the mechanism explicit. For ordering, `sortedBy` and `sortedByDescending` sort by a derived value, `sortedWith` takes a comparator, and `compareBy` combines several keys. Prefer these over mutable in-place sorts, and remember that `sortedBy` returns a new list rather than changing the receiver.

## Code
```kotlin
val (id, title) = article

val ordered = articles.sortedWith(
    compareByDescending<Article> { it.isPinned }
        .thenBy { it.title.lowercase() },
)

for ((key, value) in byCategory) renderSection(key, value)
```
