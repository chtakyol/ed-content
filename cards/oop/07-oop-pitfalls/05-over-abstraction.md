---
id: oop-over-abstraction
topic: oop/pitfalls
title: Over-abstraction
tags: [oop, pitfalls, abstraction]
related: [oop-abstraction-overview, solid-over-engineering]
sources:
  - https://martinfowler.com/bliki/RuleOfThree.html
---

## Explanation
Over-abstraction is adding layers, interfaces, and indirection before there is a real variation to absorb. The result is more files, more wiring, and a design that is harder to follow than the direct version, while the promised flexibility is never used. A common Android example is an interface for every class plus a use case that only forwards to a repository, which adds two hops without adding a rule. Introduce an abstraction when there are at least two real implementations, a boundary that needs testing, or a detail likely to change; until then, a concrete class is easier to evolve.

## Code
```kotlin
// Unnecessary layers: each one only forwards.
interface GetArticlesUseCase { suspend fun execute(): List<Article> }
class GetArticlesUseCaseImpl(private val repo: ArticleRepository) : GetArticlesUseCase {
    override suspend fun execute() = repo.load()
}

// Direct: no behavior was added by the extra layers.
class ArticleViewModel(private val repository: ArticleRepository) : ViewModel()
```
