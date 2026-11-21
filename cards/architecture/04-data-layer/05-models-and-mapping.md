---
id: architecture-models-and-mapping
topic: architecture/data
title: Models and mapping in the data layer
tags: [data, models, mapping]
related: [architecture-models-per-layer, architecture-data-layer]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
Each source has its own model: a DTO for the network, an entity for the database, and an app or domain model for the rest of the code. Mapping functions convert between them at the boundary, so a nullable API field or a Room annotation never reaches a composable. The mapping is usually a pure function in the data layer. It adds a little code but isolates change: a schema migration or an API rename stays inside the data layer.

## Code
```kotlin
fun ArticleEntity.toArticle() =
    Article(id = id, title = title, body = body)

fun ArticleDto.toEntity() = ArticleEntity(
    id = id,
    title = title.orEmpty(),
    body = body.orEmpty(),
)
```
