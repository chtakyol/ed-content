---
id: kotlin-properties-and-backing-fields
topic: kotlin/classes
title: Properties and backing fields
tags: [kotlin, properties, encapsulation]
related: [kotlin-classes-and-constructors, oop-properties-vs-fields]
sources:
  - https://kotlinlang.org/docs/properties.html
---

## Explanation
A Kotlin property looks like a field to callers but can have a custom getter or setter. Using `field` inside an accessor refers to the compiler-generated backing field, which is only created when it is needed. A property with a custom getter and no backing field computes its value on every access, while a property with a backing field stores it. This lets a class expose a read-only view, validate assignments, or derive a value without a separate method. Keep accessors cheap and free of side effects, because callers expect property access to behave like reading a value.

## Code
```kotlin
class Article(val title: String, private val rawTags: List<String>) {
    val tagCount: Int
        get() = rawTags.size

    var displayTitle: String = title
        set(value) {
            field = value.trim().ifEmpty { "Untitled" }
        }
}
```
