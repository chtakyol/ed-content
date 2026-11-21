---
id: architecture-layer-dependencies
topic: architecture/foundations
title: Dependency direction between layers
tags: [architecture, dependencies, layering]
related: [architecture-layers, architecture-repositories-as-boundary]
sources:
  - https://developer.android.com/topic/architecture
---

## Explanation
Dependencies point downward: UI depends on the domain layer, and the domain layer depends on the data layer, while the data layer depends on nothing above it. Keeping the arrows one-way prevents cycles and means a change in a screen cannot ripple into storage. In practice this is enforced with constructor injection and interfaces: a ViewModel receives a repository or use case, never a concrete Retrofit service. A data-layer class that imports a ViewModel is a design smell, because the lower layer now knows about the layer that consumes it.

## Code
```kotlin
class GetLatestNews(
    private val newsRepository: NewsRepository,
) {
    suspend operator fun invoke(): List<Article> =
        newsRepository.getLatestArticles()
}
```
