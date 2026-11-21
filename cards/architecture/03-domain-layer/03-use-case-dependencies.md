---
id: architecture-use-case-dependencies
topic: architecture/domain
title: Use case dependencies
tags: [domain, repository, dependencies]
related: [architecture-use-cases, architecture-repositories]
sources:
  - https://developer.android.com/topic/architecture/domain-layer
---

## Explanation
Use cases depend on repository abstractions, not on concrete data sources, and they receive those dependencies through the constructor. That keeps them testable with fakes and independent of Retrofit, Room, or DataStore. A use case may combine several repositories, but it should not reach into a DAO or open a network call itself. If an operation needs to outlive the caller, it should hand that work to the data layer rather than own a coroutine scope.

## Code
```kotlin
class SyncBookmarks(
    private val local: BookmarksRepository,
    private val remote: BookmarksApi,
) {
    suspend operator fun invoke() {
        local.replaceAll(remote.fetchBookmarks())
    }
}
```
