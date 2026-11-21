---
id: solid-tradeoffs
topic: solid/overview
title: Tradeoffs and over-engineering
tags: [solid, tradeoffs, design]
related: [solid-over-engineering, oop-over-abstraction]
sources:
  - https://martinfowler.com/bliki/DesignStaminaHypothesis.html
---

## Explanation
Every SOLID technique has a cost: an interface adds a file and a hop, a layer adds mapping, and a new abstraction adds a concept a reader must learn. The principles pay off when the flexibility they provide is actually used, so apply them where change is likely and keep the rest direct. A small app may not need a use-case layer, and a class with one implementation may not need an interface until a test or a second source appears. The skill is not memorizing the principles but judging when a design pressure is real and when it is speculative.

## Code
```kotlin
// Enough for a small feature.
class ArticleViewModel(private val repository: ArticleRepository) : ViewModel()

// Justified when a real rule appears.
class MarkArticleRead(
    private val repository: ArticleRepository,
    private val clock: Clock,
) {
    suspend operator fun invoke(id: ArticleId) { /* rule */ }
}
```
