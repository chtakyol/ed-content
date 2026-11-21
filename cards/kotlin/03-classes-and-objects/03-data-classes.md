---
id: kotlin-data-classes
topic: kotlin/classes
title: Data classes
tags: [kotlin, data-class, equality]
related: [oop-equals-and-hashcode, oop-copy-and-updates]
sources:
  - https://kotlinlang.org/docs/data-classes.html
---

## Explanation
A `data class` generates `equals`, `hashCode`, `toString`, `copy`, and component functions from its primary-constructor properties. This makes it a natural fit for UI state, API models, and other value-like types where two instances with the same contents should be interchangeable. Only primary-constructor properties participate in the generated members, so properties declared in the body are ignored by equality. Data classes cannot be abstract, open, sealed, or inner, and they are a poor fit for entities with identity or behavior-heavy domain objects.

## Code
```kotlin
data class ArticleUiState(
    val title: String = "",
    val isLoading: Boolean = false,
    val error: String? = null,
)

val next = state.copy(isLoading = true)
```
