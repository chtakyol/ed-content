---
id: kotlin-sequences
topic: kotlin/collections
title: Sequences
tags: [kotlin, collections, sequences]
related: [kotlin-map-filter, kotlin-flatmap-and-fold]
sources:
  - https://kotlinlang.org/docs/sequences.html
---

## Explanation
A `Sequence` is a lazy pipeline: intermediate operations such as `map` and `filter` build a description, and work happens only when a terminal operation such as `toList`, `first`, or `count` runs. Elements flow through the whole chain one at a time, so a sequence can skip work that a list pipeline would do up front and can short-circuit with `first` or `take`. For small lists the overhead of sequences usually outweighs the benefit, and `asSequence()` on a short list can even be slower. Use sequences for large collections, expensive transformations, or long chains with an early exit.

## Code
```kotlin
val firstDraft = articles
    .asSequence()
    .filter { it.isDraft }
    .map { it.title }
    .firstOrNull()
```
