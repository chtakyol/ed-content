---
id: oop-repository-abstraction
topic: oop/android
title: Repository abstraction
tags: [oop, repository, android]
related: [architecture-repositories, solid-repository-interfaces]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
A repository is the abstraction the rest of the app uses to read and write data, hiding whether the source is network, database, or cache. Its interface should speak in domain terms such as `observeArticles()` and `refresh()`, not in Retrofit calls or SQL. That lets the data layer change without touching the ViewModel and gives tests a simple seam to replace. Keep the repository focused on one area of data, return domain models rather than DTOs, and let it decide how to combine sources so the caller does not coordinate them.

## Code
```kotlin
interface ArticleRepository {
    fun observeArticles(): Flow<List<Article>>
    suspend fun refresh(): Result<Unit>
}

class DefaultArticleRepository(
    private val api: ArticleApi,
    private val dao: ArticleDao,
) : ArticleRepository {
    override fun observeArticles() = dao.observeAll()
    override suspend fun refresh() = runCatching { dao.upsert(api.articles()) }
}
```
