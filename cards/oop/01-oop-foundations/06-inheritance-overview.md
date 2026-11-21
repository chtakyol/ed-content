---
id: oop-inheritance-overview
topic: oop/foundations
title: Inheritance
tags: [oop, inheritance, fundamentals]
related: [oop-open-and-final, oop-composition-over-inheritance]
sources:
  - https://kotlinlang.org/docs/inheritance.html
---

## Explanation
Inheritance lets a subtype reuse and specialize the behavior of a supertype, expressing an "is a" relationship. It is useful when the subtype genuinely satisfies the supertype's contract and the shared behavior belongs to the parent. The danger is that inheritance couples the child to the parent's implementation, so a change in the parent can silently break subclasses. Kotlin makes classes final by default for this reason, and modern Android design tends to prefer interfaces plus composition, reserving class inheritance for shallow hierarchies where the relationship is stable.

## Code
```kotlin
open class Screen {
    open fun render() = Unit
}

class ArticleScreen(
    private val state: ArticleUiState,
) : Screen() {
    override fun render() = draw(state)
}
```
