---
id: kotlin-flatmap-and-fold
topic: kotlin/collections
title: flatMap and fold
tags: [kotlin, collections, aggregation]
related: [kotlin-map-filter, kotlin-group-and-associate]
sources:
  - https://kotlinlang.org/docs/collection-transformations.html#flatten
  - https://kotlinlang.org/docs/collection-aggregate.html
---

## Explanation
`flatMap` transforms each element into a collection and then flattens the results into one list, which is right for one-to-many relationships such as a list of sections each containing cards. `flatten` is the shorter form when the elements are already collections. `fold` walks the collection with an accumulator, and `reduce` does the same using the first element as the initial value. Reach for `sumOf`, `count`, `any`, or `all` first when they express the intent, because they are clearer than a hand-rolled fold.

## Code
```kotlin
val allCards = sections.flatMap { it.cards }

val totalTags = sections.fold(0) { total, section ->
    total + section.cards.sumOf { it.tags.size }
}
```
