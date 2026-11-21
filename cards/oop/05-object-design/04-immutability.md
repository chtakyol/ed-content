---
id: oop-immutability
topic: oop/object-design
title: Immutability
tags: [oop, immutability, state]
related: [kotlin-data-classes, oop-copy-and-updates]
sources:
  - https://developer.android.com/topic/architecture/ui-layer/state-production
---

## Explanation
An immutable object cannot change after construction, so its state is safe to share, cache, and compare. Immutability removes a whole class of bugs: no one can mutate a list while another thread is reading it, and a UI state cannot change underneath a render. In Kotlin, use `val` properties, read-only collections, and data classes with `copy` for updates. Full immutability is not always practical, especially for large object graphs or performance-sensitive buffers, but UI state and domain values are usually small enough that the safety is worth the allocation.

## Code
```kotlin
data class ArticleUiState(
    val articles: List<Article> = emptyList(),
    val isLoading: Boolean = false,
)

val loading = state.copy(isLoading = true)
```
