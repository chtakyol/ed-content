---
id: kotlin-generics-in-android
topic: kotlin/generics
title: Generics in Android code
tags: [kotlin, generics, android]
related: [kotlin-result-wrapper, kotlin-collection-types]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
Android APIs lean on generics to keep data typed end to end: `StateFlow<UiState>` tells a collector what it receives, `Result<T>` carries success or failure without a cast, and a repository interface such as `Repository<T>` can be reused for different models. A generic `Result` is usually better than a nullable payload plus a separate error flag, because the success and failure cases cannot both be true and the error type is explicit. When a screen needs several unrelated types, prefer a concrete sealed UI state over a generic state holder, since generics should preserve type information rather than hide it.

## Code
```kotlin
sealed interface LoadResult<out T> {
    data class Success<T>(val value: T) : LoadResult<T>
    data class Failure(val message: String) : LoadResult<Nothing>
}

fun <T> LoadResult<T>.getOrNull(): T? =
    (this as? LoadResult.Success)?.value
```
