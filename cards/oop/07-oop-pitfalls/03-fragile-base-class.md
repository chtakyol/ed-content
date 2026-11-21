---
id: oop-fragile-base-class
topic: oop/pitfalls
title: Fragile base class
tags: [oop, pitfalls, inheritance]
related: [oop-deep-hierarchies, solid-base-activity-and-viewmodel]
sources:
  - https://en.wikipedia.org/wiki/Fragile_base_class
---

## Explanation
A base class is fragile when a change that seems local breaks subclasses that depended on its implementation details. This happens when subclasses override methods that the base calls internally, when protected fields are mutated directly, or when the base assumes a particular order of lifecycle calls. The subclass and base become coupled through hidden contracts that are not visible in either signature. Prefer composition, keep base classes small and final where possible, and document any method that is designed to be overridden along with when the base calls it.

## Code
```kotlin
open class BaseLoader {
    open fun load() = Unit

    fun refresh() {
        load()          // subclasses may not expect this call
    }
}

class Articles : BaseLoader() {
    override fun load() { /* may break if refresh() changes order */ }
}
```
