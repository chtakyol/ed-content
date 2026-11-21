---
id: architecture-domain-layer
topic: architecture/domain
title: What the domain layer does
tags: [domain, architecture, use-case]
related: [architecture-use-cases, architecture-when-to-use-domain]
sources:
  - https://developer.android.com/topic/architecture/domain-layer
---

## Explanation
The domain layer sits between the UI and data layers and contains use cases that each express one business operation. It is optional: a small app can call repositories from ViewModels directly. It earns its place when the same business rule is needed by several screens, when a ViewModel is accumulating unrelated logic, or when rules must be tested without Android or a database. Domain types should be plain Kotlin with no Android dependencies, so they run in fast JVM unit tests.

## Code
```kotlin
class ToggleBookmark(
    private val bookmarksRepository: BookmarksRepository,
) {
    suspend operator fun invoke(articleId: String) =
        bookmarksRepository.toggle(articleId)
}
```
