---
id: architecture-models-per-layer
topic: architecture/foundations
title: One model per layer
tags: [architecture, models, mapping]
related: [architecture-models-and-mapping, architecture-data-layer]
sources:
  - https://developer.android.com/topic/architecture/recommendations
---

## Explanation
In a complex app, do not reuse one model everywhere. A network DTO mirrors the wire format and changes with the API, a database entity mirrors the schema and its annotations, a domain model expresses the concepts the app reasons about, and a UI model contains exactly what one screen renders. Mapping between them at layer boundaries keeps API quirks and schema details out of composables and lets each layer evolve independently. In a small app the mapping can be thin or skipped, but the boundaries should still be deliberate.

## Code
```kotlin
data class ArticleDto(val id: String, val title: String?)
data class ArticleEntity(val id: String, val title: String)
data class Article(val id: String, val title: String)

fun ArticleDto.toEntity() = ArticleEntity(id, title.orEmpty())
```
