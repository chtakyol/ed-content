---
id: architecture-repositories
topic: architecture/data
title: Repositories
tags: [data, repository, ssot]
related: [architecture-data-layer, architecture-single-source-of-truth]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
A repository is the entry point to the data layer and the only type the UI or domain layer should know. It decides whether to read from cache, network, or both, maps storage models to app models, and exposes data as a flow or a suspend function. Repositories are usually singletons scoped to the app, because their caches and in-flight requests must be shared. A repository should not know about composables, ViewModels, or navigation.

## Code
```kotlin
interface NewsRepository {
    fun getArticles(): Flow<List<Article>>
    suspend fun refresh(): Result<Unit>
}
```
