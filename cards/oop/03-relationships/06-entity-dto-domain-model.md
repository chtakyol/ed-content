---
id: oop-entity-dto-domain-model
topic: oop/relationships
title: Entity, DTO, and domain model
tags: [oop, modeling, architecture]
related: [architecture-models-per-layer, architecture-models-and-mapping]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
An entity or DTO models a storage or network shape, while a domain model models the concept the app actually works with. They often differ: an API response may nest fields or use strings for dates, and a database row may have columns the UI never needs. Mapping at the boundary keeps external formats from leaking into the domain and lets the domain enforce its own invariants. The cost is extra types and mapping code, so use a shared model when the shapes truly match and split them when a changing external contract would otherwise ripple through the app.

## Code
```kotlin
// Network shape, nullable and stringly typed.
data class ArticleDto(
    val id: String?,
    val published_at: String?,
)

// Domain shape, validated and typed.
data class Article(
    val id: ArticleId,
    val publishedAt: Instant,
)
```
