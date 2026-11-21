---
id: oop-abstract-classes
topic: oop/inheritance
title: Abstract classes
tags: [oop, inheritance, abstraction]
related: [oop-interfaces, oop-overriding]
sources:
  - https://kotlinlang.org/docs/classes.html#abstract-classes
---

## Explanation
An abstract class cannot be instantiated and may declare abstract members that subclasses must implement. Unlike an interface, it can hold state, a constructor, and protected implementation shared by all subclasses. Use an abstract class when subclasses genuinely share state and a template of operations, such as a worker that owns a queue and delegates the actual fetch to a subclass. Keep the shared surface small and avoid protected mutable fields, because subclasses can then break the parent's invariants. If there is no shared state, an interface is usually the lighter choice.

## Code
```kotlin
abstract class PagedSource<T> {
    private val items = mutableListOf<T>()

    protected abstract suspend fun fetch(page: Int): List<T>

    suspend fun load(page: Int) {
        items += fetch(page)
    }
}
```
