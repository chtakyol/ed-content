---
id: oop-value-objects
topic: oop/object-design
title: Value objects
tags: [oop, value-object, types]
related: [kotlin-value-classes, oop-state-behavior-identity]
sources:
  - https://martinfowler.com/bliki/ValueObject.html
---

## Explanation
A value object is defined by its data rather than its identity, so two instances with the same values are equal and interchangeable. It is usually immutable, validates its own invariants on construction, and carries behavior that belongs to the concept, such as a `Money` that knows how to add or a `DateRange` that knows whether it overlaps. Using a value object instead of a primitive prevents mixing unrelated values and gives rules a home. In Android, ids, durations, and pagination tokens are common value objects.

## Code
```kotlin
@JvmInline
value class PageSize(val value: Int) {
    init {
        require(value in 1..100)
    }
}

data class DateRange(val start: Long, val end: Long) {
    init { require(start <= end) }
    fun overlaps(other: DateRange) = start <= other.end && other.start <= end
}
```
