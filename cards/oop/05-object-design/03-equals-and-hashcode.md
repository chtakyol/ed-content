---
id: oop-equals-and-hashcode
topic: oop/object-design
title: equals and hashCode
tags: [oop, equality, collections]
related: [kotlin-data-classes, oop-immutability]
sources:
  - https://kotlinlang.org/docs/equality.html
---

## Explanation
`equals` defines when two objects are considered the same value, and `hashCode` must agree with it: equal objects must have equal hash codes. Hash-based collections such as `HashSet` and `HashMap` rely on this contract to find entries. Kotlin data classes generate both from their primary-constructor properties, which is correct for value-like types but wrong for entities whose identity is a separate id. For an entity, compare ids and derive the hash from the id; for a value object, include every field that participates in equality. Never include mutable fields in a hash key used by a collection.

## Code
```kotlin
class Article(val id: String, var title: String) {
    override fun equals(other: Any?) =
        other is Article && other.id == id

    override fun hashCode() = id.hashCode()
}

val seen = hashSetOf(article)   // identity by id, not title
```
