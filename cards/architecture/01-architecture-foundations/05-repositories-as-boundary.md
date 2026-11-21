---
id: architecture-repositories-as-boundary
topic: architecture/foundations
title: Repositories as the data boundary
tags: [architecture, repository, boundaries]
related: [architecture-repositories, architecture-data-sources]
sources:
  - https://developer.android.com/topic/architecture/recommendations
---

## Explanation
Repositories are the public API of the data layer. They hide whether data comes from a database, a network, DataStore, or a device sensor, and they decide how those sources are combined, cached, and refreshed. UI-layer types such as composables and ViewModels must never touch a DAO or an API service directly, because doing so duplicates caching rules and error handling in every screen. Even when a repository wraps a single data source, creating it defines a clear seam for testing and future change.

## Code
```kotlin
interface NewsRepository {
    fun getArticles(): Flow<List<Article>>
    suspend fun refresh()
}

class DefaultNewsRepository(
    private val local: NewsDao,
    private val remote: NewsApi,
) : NewsRepository
```
