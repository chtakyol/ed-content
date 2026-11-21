---
id: kotlin-collection-types
topic: kotlin/collections
title: Collection types
tags: [kotlin, collections, data-structures]
related: [kotlin-read-only-vs-mutable, kotlin-map-filter]
sources:
  - https://kotlinlang.org/docs/collections-overview.html
---

## Explanation
Kotlin's collection interfaces mirror the familiar shapes: `List` for ordered sequences, `Set` for unique elements, and `Map` for key-value lookup. Each has a read-only interface and a mutable subinterface, and the standard library provides factory functions such as `listOf`, `mutableListOf`, `setOf`, `mapOf`, and `buildList`. Choosing the right shape communicates intent: use a `Set` when duplicates are invalid and a `Map` when lookup by key is the main operation. In Android, adapters and Compose lists consume `List`, while caches and indexes often need a `Map`.

## Code
```kotlin
val sections: List<Section> = listOf(basics, flows)
val ids: Set<String> = sections.map { it.id }.toSet()
val byId: Map<String, Section> = sections.associateBy { it.id }
```
