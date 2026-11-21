---
id: oop-default-methods
topic: oop/inheritance
title: Default methods
tags: [oop, interfaces, defaults]
related: [oop-interfaces, solid-isp-definition]
sources:
  - https://kotlinlang.org/docs/interfaces.html#properties-in-interfaces
---

## Explanation
An interface can provide a method body, so implementers get shared behavior without a base class. This is useful for convenience operations built on a smaller required method, such as a `isEmpty()` default that calls `load()` and checks the result. Defaults should be correct for every implementation and should not assume hidden state, because an implementation can override them. If two interfaces provide the same default, the implementing class must resolve the conflict explicitly. Keep defaults thin so they remain a convenience rather than a second inheritance hierarchy.

## Code
```kotlin
interface ArticleRepository {
    suspend fun load(): List<Article>

    suspend fun isEmpty(): Boolean = load().isEmpty()
}
```
