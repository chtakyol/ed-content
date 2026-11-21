---
id: oop-abstraction-overview
topic: oop/foundations
title: Abstraction
tags: [oop, abstraction, fundamentals]
related: [oop-program-to-an-interface, oop-leaky-abstractions]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
Abstraction exposes the essential contract of a component and hides the details that callers should not depend on. A repository interface is a familiar Android example: the ViewModel calls `loadArticles()` and does not know whether the data comes from Retrofit, Room, or an in-memory cache. Good abstractions are named after what the caller needs, not after the implementation, and they hide choices that are likely to change. Abstraction is not the same as adding an interface to every class; it pays off where there are multiple implementations, a boundary worth testing, or a detail that should stay replaceable.

## Code
```kotlin
interface ArticleRepository {
    suspend fun load(): List<Article>
}

class NetworkArticleRepository(
    private val api: ArticleApi,
) : ArticleRepository {
    override suspend fun load(): List<Article> = api.articles()
}
```
