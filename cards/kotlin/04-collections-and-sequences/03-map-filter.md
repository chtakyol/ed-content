---
id: kotlin-map-filter
topic: kotlin/collections
title: map and filter
tags: [kotlin, collections, operators]
related: [kotlin-collection-types, kotlin-flatmap-and-fold]
sources:
  - https://kotlinlang.org/docs/collection-transformations.html
---

## Explanation
`map` transforms every element and returns a list of the results, preserving order and size, while `filter` keeps only elements that satisfy a predicate. They are the two workhorses of collection code and replace most manual loops that build a new list. Chains are lazy only when you switch to a sequence; on a plain list every step creates an intermediate collection. Use `mapNotNull` to transform and drop nulls in one pass, and `filterIsInstance` when a heterogeneous list needs narrowing to one type.

## Code
```kotlin
val visible = articles
    .filter { !it.isDraft }
    .map { it.title }
    .mapNotNull { it.takeIf(String::isNotBlank) }
```
