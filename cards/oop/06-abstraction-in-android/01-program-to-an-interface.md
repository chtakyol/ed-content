---
id: oop-program-to-an-interface
topic: oop/android
title: Program to an interface
tags: [oop, interfaces, android]
related: [oop-interfaces, solid-dip-definition]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
Programming to an interface means callers depend on the role they need, not on the concrete class that currently fills it. A ViewModel that depends on `ArticleRepository` can be tested with a fake, run against a network implementation in production, and later wrapped with caching without changing the ViewModel. This is not a rule to put an interface in front of every class: it pays off at boundaries that have multiple implementations, need isolation in tests, or are likely to change. Inside a single implementation, a concrete class is simpler and perfectly fine.

## Code
```kotlin
interface ArticleRepository {
    suspend fun load(): List<Article>
}

class ArticleViewModel(
    private val repository: ArticleRepository,
) : ViewModel() {
    fun refresh() = viewModelScope.launch { repository.load() }
}
```
