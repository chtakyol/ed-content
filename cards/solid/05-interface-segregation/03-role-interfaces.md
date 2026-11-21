---
id: solid-role-interfaces
topic: solid/isp
title: Role interfaces
tags: [solid, isp, interfaces]
related: [solid-isp-definition, solid-splitting-repositories]
sources:
  - https://martinfowler.com/bliki/RoleInterface.html
---

## Explanation
A role interface is named after the role a client needs, not after the implementation that fulfills it: `ArticleReader`, `SyncTrigger`, `OnArticleClick`. This makes the dependency obvious at the call site and keeps the contract small. A single implementation can implement several role interfaces, so segregation does not require splitting the implementation, only the view of it that each client sees. In Android, a screen that only reads articles should depend on a reader, while a background worker that only refreshes should depend on a refresher. The implementation can still be one repository with both methods.

## Code
```kotlin
interface ArticleReader {
    fun observe(): Flow<List<Article>>
}

interface ArticleRefresher {
    suspend fun refresh()
}

class ArticleRepository(
    private val api: ArticleApi,
    private val dao: ArticleDao,
) : ArticleReader, ArticleRefresher {
    override fun observe() = dao.observeAll()
    override suspend fun refresh() { dao.upsert(api.articles()) }
}
```
