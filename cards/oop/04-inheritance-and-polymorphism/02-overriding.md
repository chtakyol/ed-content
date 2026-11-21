---
id: oop-overriding
topic: oop/inheritance
title: Overriding
tags: [oop, inheritance, polymorphism]
related: [oop-open-and-final, oop-abstract-classes]
sources:
  - https://kotlinlang.org/docs/inheritance.html#overriding-methods
---

## Explanation
Overriding replaces a superclass member with a subtype-specific implementation while keeping the same signature and contract. In Kotlin the subclass must write `override`, and an overridden member remains open unless marked `final`, so each extension point is explicit. Overriding is powerful when the subtype genuinely refines the parent behavior, and dangerous when the override has to weaken a guarantee, ignore part of the contract, or depend on the parent's implementation details. Before overriding, check whether the parent method should be a strategy injected into the object instead.

## Code
```kotlin
abstract class Exporter {
    abstract fun export(articles: List<Article>): String
}

class CsvExporter : Exporter() {
    override fun export(articles: List<Article>): String =
        articles.joinToString("\n") { "${it.id},${it.title}" }
}
```
