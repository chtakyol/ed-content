---
id: solid-over-engineering
topic: solid/practice
title: Over-engineering
tags: [solid, practice, tradeoffs]
related: [solid-tradeoffs, oop-over-abstraction]
sources:
  - https://martinfowler.com/bliki/YouArentGonnaNeedIt.html
---

## Explanation
Over-engineering applies principles to problems that do not exist yet: an interface for a class with one implementation, a use case that only forwards a call, a plugin system for a fixed set of two screens, or an event bus for a single listener. The code looks principled but is harder to read, slower to change, and full of indirection that no requirement justifies. The antidote is to design for the change in front of you and leave a clean seam when the second case appears. SOLID is a tool for managing known variation and coupling, not a prediction market for future features.

## Code
```kotlin
// Over-engineered for one screen.
interface ShowArticlesUseCase
class ShowArticlesUseCaseImpl(private val repo: ArticleRepository) : ShowArticlesUseCase
class ArticleViewModel(private val useCase: ShowArticlesUseCase) : ViewModel()

// Right-sized.
class ArticleViewModel(private val repository: ArticleRepository) : ViewModel()
```
