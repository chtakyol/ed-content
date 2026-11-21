---
id: oop-state-behavior-identity
topic: oop/foundations
title: State, behavior, and identity
tags: [oop, fundamentals, objects]
related: [oop-classes-objects-instances, oop-value-objects]
sources:
  - https://martinfowler.com/bliki/ValueObject.html
---

## Explanation
An object has state, the data it holds; behavior, the operations it exposes; and identity, the property that distinguishes it from other objects. Entity-like objects such as a user or an article have identity that survives changes to their fields, so two versions of the same article are the same thing even when the title changes. Value-like objects such as a date range or a color have no separate identity, and two instances with equal values are interchangeable. Mixing the two leads to bugs: a value object compared by reference breaks caching, and an entity compared by fields loses updates when a field changes.

## Code
```kotlin
// Entity: identity is the id, not the current contents.
class Article(val id: String, var title: String)

// Value object: equality is the data itself.
data class DateRange(val start: Long, val end: Long)
```
