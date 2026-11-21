---
id: kotlin-result-wrapper
topic: kotlin/android
title: Result wrappers
tags: [kotlin, android, errors]
related: [kotlin-generics-in-android, architecture-data-errors]
sources:
  - https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-result/
---

## Explanation
A `Result<T>` makes success and failure explicit in the return type, so a caller cannot ignore an error by accident. Kotlin's standard `Result` works well for local computation, but a domain-specific sealed result often fits better because it can carry a typed error instead of a `Throwable`. Use a wrapper at the boundary between the data layer and its callers, and keep exceptions for truly exceptional conditions. In Android, a repository that returns `LoadResult<List<Article>>` lets the ViewModel map failures to UI messages without depending on exception types from Retrofit or Room.

## Code
```kotlin
sealed interface LoadResult<out T> {
    data class Success<T>(val value: T) : LoadResult<T>
    data class Failure(val error: DataError) : LoadResult<Nothing>
}

suspend fun load(): LoadResult<List<Article>> =
    runCatching { api.articles() }
        .fold(
            onSuccess = { LoadResult.Success(it) },
            onFailure = { LoadResult.Failure(it.toDataError()) },
        )
```
