---
id: solid-splitting-repositories
topic: solid/isp
title: Splitting repositories
tags: [solid, isp, repositories]
related: [oop-repository-abstraction, solid-role-interfaces]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
A repository that exposes every operation for an entity can become a fat interface: read, write, search, sync, observe, export, and analytics all in one. Clients then depend on methods they never call, and a fake has to implement all of them. Split by client role, such as a reader for the UI, a writer for the editor, and a syncer for background work, and let one implementation satisfy several roles. This keeps tests small and makes it clear which parts of the data layer a feature actually uses. Do not split so finely that callers must coordinate several repositories to complete one operation; keep operations used together on the same role.

## Code
```kotlin
interface ArticleFeed {
    fun observe(): Flow<List<Article>>
}

interface ArticleEditor {
    suspend fun save(article: Article)
}

interface ArticleSync {
    suspend fun refresh()
}

class DefaultArticleRepository : ArticleFeed, ArticleEditor, ArticleSync {
    /* implements each role once */
}
```
