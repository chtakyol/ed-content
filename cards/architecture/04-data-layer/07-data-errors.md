---
id: architecture-data-errors
topic: architecture/data
title: Errors in the data layer
tags: [data, errors, result]
related: [architecture-main-safety, architecture-conflicts-and-retries]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
Data-layer errors should be translated into something the caller can act on. Network failures, missing rows, and parse errors are different conditions, and the UI usually needs to distinguish "no data yet" from "could not refresh". Returning a sealed result or a domain error type keeps exception details out of ViewModels and makes retry and message mapping explicit. Cancellation must always be rethrown, never converted into a user-visible failure.

## Code
```kotlin
sealed interface DataResult<out T> {
    data class Success<T>(val value: T) : DataResult<T>
    data class Failure(val reason: ErrorReason) : DataResult<Nothing>
}

suspend fun refresh(): DataResult<Unit> = try {
    api.fetch()
    DataResult.Success(Unit)
} catch (e: CancellationException) {
    throw e
} catch (e: IOException) {
    DataResult.Failure(ErrorReason.Network)
}
```
