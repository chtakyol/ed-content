---
id: solid-repository-interfaces
topic: solid/dip
title: Repository interfaces
tags: [solid, dip, repository]
related: [oop-repository-abstraction, solid-abstraction-ownership]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
A repository interface is the most common dependency inversion seam in Android. The ViewModel and use cases depend on the interface, while the data layer supplies an implementation that talks to Retrofit, Room, or a cache. The interface should use domain models and plain Kotlin types, not framework types, so the policy can be tested on the JVM. It should also expose the operations the policy needs rather than mirroring every data source method. Start with one interface per repository and split it only when a client is forced to depend on operations it does not use.

## Code
```kotlin
interface ArticleRepository {
    fun observe(): Flow<List<Article>>
    suspend fun refresh(): Result<Unit>
    suspend fun markRead(id: ArticleId): Result<Unit>
}

class DefaultArticleRepository(
    private val remote: ArticleRemoteSource,
    private val local: ArticleLocalSource,
) : ArticleRepository {
    override fun observe() = local.observe()
    override suspend fun refresh() = runCatching { local.upsert(remote.load()) }
    override suspend fun markRead(id: ArticleId) = runCatching { local.markRead(id) }
}
```
