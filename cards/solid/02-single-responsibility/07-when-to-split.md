---
id: solid-when-to-split
topic: solid/srp
title: When to split
tags: [solid, srp, refactoring]
related: [solid-reasons-to-change, oop-over-abstraction]
sources:
  - https://martinfowler.com/bliki/RuleOfThree.html
---

## Explanation
Split a class when you can name a second reason to change, when unrelated tests keep breaking together, or when parallel work constantly conflicts in the same file. Do not split just because a class is long or because a principle says so; a cohesive 300-line class can be easier to understand than five interdependent 60-line pieces. Start with the change that hurts most, extract one collaborator, and keep the behavior identical. If the extracted piece has no name or no caller that makes sense, the split is probably premature. The goal is a boundary that makes future changes local, not a diagram with more boxes.

## Code
```kotlin
// Split when the reasons are distinct and stable.
class ArticleViewModel(
    private val repository: ArticleRepository,
    private val analytics: Analytics,
) : ViewModel()

// Keep together while the behavior is one cohesive operation.
class ArticleFormatter(private val clock: Clock) {
    fun title(article: Article): String = article.title.trim()
    fun subtitle(article: Article): String = clock.relative(article.publishedAt)
}
```
