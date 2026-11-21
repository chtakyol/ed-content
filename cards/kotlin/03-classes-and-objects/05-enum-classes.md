---
id: kotlin-enum-classes
topic: kotlin/classes
title: Enum classes
tags: [kotlin, enum, constants]
related: [kotlin-sealed-classes, kotlin-when-expressions]
sources:
  - https://kotlinlang.org/docs/enum-classes.html
---

## Explanation
An enum class defines a fixed set of named instances, each of which can carry properties and override behavior. Enums are the right choice when a value is one of a small, stable list, such as a sort order, a tab, or a network status. Unlike sealed classes, all enum constants are known at compile time and share the same shape, so they cannot carry different payloads. Keep enum constants free of Android context references, because they live for the lifetime of the process and are easy to leak by accident.

## Code
```kotlin
enum class SortOrder(val label: String) {
    Newest("Newest first"),
    Oldest("Oldest first"),
    Popular("Most popular"),
}

val order = SortOrder.Newest
val label = order.label
```
