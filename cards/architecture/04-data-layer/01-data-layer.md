---
id: architecture-data-layer
topic: architecture/data
title: What the data layer does
tags: [data, architecture, repository]
related: [architecture-repositories, architecture-data-sources]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
The data layer contains repositories and data sources and owns the app's data along with most of its business rules. Repositories expose data to the rest of the app, decide which source to read, and coordinate writes; data sources each talk to one system, such as a Room database, a network API, or DataStore. The layer exposes immutable, app-facing models and hides the mechanics of caching, threading, and error handling from the UI. When it is missing, those concerns leak into ViewModels and get duplicated per screen.

## Code
```kotlin
class DefaultNewsRepository(
    private val local: NewsDao,
    private val remote: NewsApi,
) : NewsRepository {
    override fun getArticles(): Flow<List<Article>> =
        local.observeAll()
}
```
