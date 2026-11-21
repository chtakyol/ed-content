---
id: architecture-data-sources
topic: architecture/data
title: Data sources
tags: [data, network, local]
related: [architecture-repositories, architecture-multiple-sources]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
A data source wraps exactly one system: a Room DAO, a Retrofit service, a DataStore file, or a device API. It converts that system's types into models the repository can use and keeps its public surface small. Data sources are not exposed outside the data layer; the repository composes them so callers never need to know whether a value came from disk or network. A data source that starts making caching decisions has grown into a repository.

## Code
```kotlin
class RemoteNewsDataSource(private val api: NewsApi) {
    suspend fun fetch(): List<ArticleDto> = api.getArticles()
}

class LocalNewsDataSource(private val dao: NewsDao) {
    fun observe(): Flow<List<ArticleEntity>> = dao.observeAll()
}
```
