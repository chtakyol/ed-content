---
id: kotlin-interfaces-vs-abstract-classes
topic: kotlin/classes
title: Interfaces vs abstract classes
tags: [kotlin, interfaces, abstract]
related: [kotlin-inheritance-and-open, oop-interfaces]
sources:
  - https://kotlinlang.org/docs/interfaces.html
  - https://kotlinlang.org/docs/classes.html#abstract-classes
---

## Explanation
An interface declares a contract and can provide default implementations, but it cannot store state in a backing field. An abstract class can hold state, constructors, and protected members, at the cost of limiting a subclass to one parent. Use an interface when several unrelated types should be able to satisfy the same contract, such as a repository or a state holder. Use an abstract class when subclasses genuinely share state and implementation, and keep the hierarchy shallow so the shared code does not become a fragile base class.

## Code
```kotlin
interface ArticleSource {
    suspend fun load(): List<Article>
}

abstract class CachedSource(
    protected val cache: ArticleCache,
) : ArticleSource {
    protected fun cached(): List<Article> = cache.read()
}
```
