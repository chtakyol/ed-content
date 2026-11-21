---
id: solid-why-principles-matter
topic: solid/overview
title: Why the principles matter
tags: [solid, design, maintainability]
related: [solid-what-is-solid, solid-tradeoffs]
sources:
  - https://developer.android.com/topic/architecture/recommendations
---

## Explanation
The point of SOLID is to reduce the cost of change. Software changes when requirements, APIs, and platforms change, and the principles push decisions toward small, replaceable pieces with explicit contracts. That makes code easier to test, because dependencies can be substituted, and easier to reason about, because each unit has a narrow job. In Android the benefit is concrete: a ViewModel that depends on a repository interface can be tested without a device, and a feature can change its data source without rewriting the screen. The principles earn their keep when they remove real friction, not when they add ceremony.

## Code
```kotlin
// A narrow contract makes the screen testable and replaceable.
interface ArticleRepository {
    suspend fun load(): List<Article>
}

class ArticleViewModel(private val repository: ArticleRepository) : ViewModel()
```
