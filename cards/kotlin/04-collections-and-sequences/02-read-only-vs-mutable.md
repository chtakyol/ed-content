---
id: kotlin-read-only-vs-mutable
topic: kotlin/collections
title: Read-only vs mutable collections
tags: [kotlin, collections, immutability]
related: [kotlin-collection-types, oop-exposing-read-only-collections]
sources:
  - https://kotlinlang.org/docs/collections-overview.html#collection-types
---

## Explanation
`List`, `Set`, and `Map` are read-only interfaces: they expose no mutation methods, although the underlying object may still be mutable. `MutableList`, `MutableSet`, and `MutableMap` add mutation, and a mutable collection can be passed where a read-only one is expected because the mutable interface extends the read-only one. Expose read-only types from public APIs and keep the mutable reference private, so callers cannot add or remove items behind the owner's back. If you need a true snapshot, copy with `toList()`; otherwise the read-only interface is a convention, not a guarantee of immutability.

## Code
```kotlin
class Inbox {
    private val _items = mutableListOf<Article>()
    val items: List<Article> get() = _items

    fun add(article: Article) {
        _items += article
    }
}
```
