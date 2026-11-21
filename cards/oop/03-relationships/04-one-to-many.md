---
id: oop-one-to-many
topic: oop/relationships
title: One-to-many relationships
tags: [oop, relationships, modeling]
related: [oop-aggregation-and-composition, kotlin-group-and-associate]
sources:
  - https://developer.android.com/topic/architecture/data-layer
---

## Explanation
A one-to-many relationship means one object is associated with many others, such as a section containing cards or a user owning articles. In memory it is usually a collection on the parent, while in a database it is a foreign key on the child. Decide which side owns the relationship: a parent that owns its children can enforce their lifecycle and ordering, while a child that merely references a parent should not control the parent's state. For large or independent collections, expose lookup by id and avoid duplicating the same list in several layers.

## Code
```kotlin
class Section(
    val id: String,
    val cards: List<Card>,
)

class Card(
    val id: String,
    val sectionId: String,
)

val bySection = cards.groupBy { it.sectionId }
```
