---
id: oop-deep-hierarchies
topic: oop/pitfalls
title: Deep hierarchies
tags: [oop, pitfalls, inheritance]
related: [oop-composition-over-inheritance, oop-fragile-base-class]
sources:
  - https://refactoring.guru/smells/refused-bequest
---

## Explanation
A deep inheritance hierarchy forces a reader to jump through many levels to understand what a method actually does, and each level can override behavior in subtle ways. It also makes change risky, because a modification near the root affects every descendant. Deep hierarchies often grow from a base class that accumulated helpers over time or from modeling variations as subclasses instead of as data or strategies. Flatten toward interfaces and composition, and if a hierarchy is still the right model, keep it shallow and make each level meaningful.

## Code
```kotlin
// Deep and hard to follow.
open class BaseScreen : BaseFragment()
open class ListScreen : BaseScreen()
open class ArticleListScreen : ListScreen()

// Flat and explicit.
class ArticleListScreen(
    private val stateHolder: ArticleListStateHolder,
    private val analytics: Analytics,
)
```
