---
id: architecture-multiple-sources
topic: architecture/data
title: Combining multiple data sources
tags: [data, caching, sources]
related: [architecture-data-sources, architecture-local-source]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
When a feature has both local and remote data, the repository decides how they combine. A common policy is to observe the database as the single source of truth and refresh it from the network; another reads the network first and falls back to cache on failure. That decision belongs in one repository method rather than in every caller. Expose one stream whose emissions already reflect the policy, so the UI never has to merge sources itself.

## Code
```kotlin
override fun getArticles(): Flow<List<Article>> = local.observe()
    .onStart {
        runCatching { remote.fetch() }
            .onSuccess(local::replaceAll)
    }
```
