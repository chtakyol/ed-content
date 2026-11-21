---
id: solid-strategy-pattern
topic: solid/ocp
title: The strategy pattern
tags: [solid, ocp, strategy]
related: [solid-polymorphic-extension, solid-extension-over-modification]
sources:
  - https://refactoring.guru/design-patterns/strategy
---

## Explanation
Strategy puts a family of interchangeable algorithms behind one interface and lets the caller choose or replace the implementation. It is a direct application of open-closed: the context stays unchanged while a new strategy is added. In Kotlin a function type can be the strategy, which removes the interface when the algorithm has no state. Use a named interface when the strategy has several operations or dependencies, and a lambda when it is a single pure operation. Android examples include sorting, retry policies, cache eviction, and feature-dependent formatting.

## Code
```kotlin
fun interface ArticleSorter {
    fun sort(articles: List<Article>): List<Article>
}

class ArticleList(
    private val sorter: ArticleSorter,
) {
    fun render(articles: List<Article>) = display(sorter.sort(articles))
}

val byNewest = ArticleSorter { it.sortedByDescending(Article::publishedAt) }
```
