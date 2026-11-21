---
id: architecture-single-source-of-truth
topic: architecture/foundations
title: Single source of truth
tags: [architecture, ssot, state]
related: [architecture-local-source, architecture-data-layer]
sources:
  - https://developer.android.com/topic/architecture
---

## Explanation
Every piece of data should have exactly one owner that all other components read from. In an offline-first app the database is usually that owner: repositories expose its streams, and network responses are written into it rather than handed straight to the UI. With one source, two screens cannot disagree, writes are observed everywhere at once, and a failed refresh leaves the last known good data on screen. Multiple competing sources produce stale screens and races between writers.

## Code
```kotlin
class NewsRepository(
    private val dao: ArticleDao,
    private val api: NewsApi,
) {
    fun getArticles(): Flow<List<Article>> = dao.observeArticles()

    suspend fun refresh() = dao.upsertAll(api.fetchArticles())
}
```
