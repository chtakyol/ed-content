---
id: oop-interfaces
topic: oop/inheritance
title: Interfaces
tags: [oop, interfaces, abstraction]
related: [oop-abstract-classes, oop-program-to-an-interface]
sources:
  - https://kotlinlang.org/docs/interfaces.html
---

## Explanation
An interface declares a contract that unrelated types can implement, and a class can implement several interfaces at once. This is the main tool for polymorphism without a single inheritance tree: a repository, a fake, and a decorator can all be `ArticleRepository` without sharing a base class. Interfaces can have default implementations and properties, but they cannot store state in a backing field. Keep interfaces small and named after the role the caller needs, and avoid adding a method to a widely implemented interface unless every implementation can honor it.

## Code
```kotlin
interface ArticleRepository {
    suspend fun load(): List<Article>
    suspend fun save(article: Article)
}

class FakeArticleRepository : ArticleRepository {
    private val items = mutableListOf<Article>()
    override suspend fun load() = items.toList()
    override suspend fun save(article: Article) { items += article }
}
```
