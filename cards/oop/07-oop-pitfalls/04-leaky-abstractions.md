---
id: oop-leaky-abstractions
topic: oop/pitfalls
title: Leaky abstractions
tags: [oop, pitfalls, abstraction]
related: [oop-abstraction-overview, solid-dip-definition]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
An abstraction leaks when callers must know details it was supposed to hide. A repository that exposes a Retrofit `Response` or a Room `Entity` forces the ViewModel to understand the data source, and changing the source then breaks callers. Leaks also appear as exceptions that escape a layer, flags that switch behavior based on the implementation, or methods named after a specific technology. Keep abstractions in domain terms, translate errors into domain types, and test whether a caller could be written without knowing which implementation is behind the interface.

## Code
```kotlin
// Leaky: exposes Retrofit and Room details.
interface ArticleRepository {
    suspend fun fetch(): Response<ArticleDto>
    fun observe(): LiveData<ArticleEntity>
}

// Clean: domain types only.
interface ArticleRepository {
    suspend fun load(): Result<List<Article>>
    fun observe(): Flow<List<Article>>
}
```
