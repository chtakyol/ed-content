---
id: architecture-main-safety
topic: architecture/data
title: Main-safety
tags: [data, coroutines, threading]
related: [architecture-data-layer, architecture-data-errors]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
Main-safety means every public data-layer function can be called from the main thread without blocking it. Repositories and data sources move blocking work to `Dispatchers.IO` or a CPU dispatcher internally, using `withContext` or an API that already suspends. Callers should not have to remember which dispatcher a function needs or wrap every call themselves. Keeping the dispatcher choice inside the data layer also makes it replaceable in tests.

## Code
```kotlin
class DefaultNewsRepository(
    private val dao: NewsDao,
    private val io: CoroutineDispatcher = Dispatchers.IO,
) : NewsRepository {
    override suspend fun refresh() = withContext(io) {
        dao.replaceAll(/* blocking work */)
    }
}
```
