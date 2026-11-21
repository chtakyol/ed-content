---
id: oop-exposing-read-only-collections
topic: oop/encapsulation
title: Exposing read-only collections
tags: [oop, encapsulation, collections]
related: [kotlin-read-only-vs-mutable, oop-invariants]
sources:
  - https://kotlinlang.org/docs/collections-overview.html#collection-types
---

## Explanation
A class that exposes a `MutableList` property hands callers the ability to mutate its internal state without going through its methods. The usual Kotlin pattern is a private mutable collection plus a public read-only `List`, `Set`, or `Map` view. The read-only type is a compile-time contract rather than a deep copy, so callers can still downcast or hold a reference to the same object, but the API no longer advertises mutation as allowed. When the collection must be a stable snapshot, expose `items.toList()` so later internal changes do not surprise the caller.

## Code
```kotlin
class Inbox {
    private val _articles = mutableListOf<Article>()
    val articles: List<Article> get() = _articles

    fun add(article: Article) {
        _articles += article
    }
}
```
