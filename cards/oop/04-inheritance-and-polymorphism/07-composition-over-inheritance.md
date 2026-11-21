---
id: oop-composition-over-inheritance
topic: oop/inheritance
title: Composition over inheritance
tags: [oop, composition, design]
related: [oop-aggregation-and-composition, oop-delegation-in-android]
sources:
  - https://refactoring.guru/design-patterns/composite
---

## Explanation
Composition builds behavior by holding collaborators and delegating to them, rather than by extending a base class. It avoids the tight coupling of inheritance: the composed object can swap implementations, combine behaviors, and be tested with fakes without a subclass tree. Inheritance still has a place when the subtype is genuinely a specialization and the parent contract is stable. The practical rule is to start with composition and introduce inheritance only when the "is a" relationship is real and the parent is designed for extension. Android's move from deep base-activity hierarchies toward composable state holders reflects this tradeoff.

## Code
```kotlin
class ArticleViewModel(
    private val repository: ArticleRepository,
    private val formatter: DateFormatter,
) : ViewModel() {
    fun publishedLabel(article: Article): String =
        formatter.format(article.publishedAt)
}
```
