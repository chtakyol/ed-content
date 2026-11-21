---
id: architecture-use-cases
topic: architecture/domain
title: Use cases
tags: [domain, use-case, business-logic]
related: [architecture-domain-layer, architecture-use-case-dependencies]
sources:
  - https://developer.android.com/topic/architecture/domain-layer
---

## Explanation
A use case is a single, named business operation, usually a class with one public `invoke` function. It combines repository calls, applies rules, and returns a result the caller can consume. Naming it after the user's goal, such as `GetLatestNews` or `ToggleBookmark`, keeps ViewModels thin and makes the rule discoverable. Use cases should not hold UI state or Android types; they are stateless and can be reused by any number of ViewModels.

## Code
```kotlin
class GetLatestNews(
    private val repository: NewsRepository,
) {
    suspend operator fun invoke(limit: Int = 20): List<Article> =
        repository.getArticles().take(limit)
}
```
