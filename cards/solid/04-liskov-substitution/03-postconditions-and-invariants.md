---
id: solid-postconditions-and-invariants
topic: solid/lsp
title: Postconditions and invariants
tags: [solid, lsp, contracts]
related: [solid-contracts-and-preconditions, oop-invariants]
sources:
  - https://martinfowler.com/bliki/DesignByContract.html
---

## Explanation
A postcondition is what a method guarantees after it returns, such as a sorted list or a non-negative count. A subtype may strengthen a postcondition, promising more, but must not weaken it by returning less than the parent promised. Class invariants work the same way: a subtype must preserve every invariant its parent established. A classic violation is a subtype that returns an empty list to mean "not loaded" when the parent contract says an empty list means "loaded but empty," which forces callers to distinguish the cases. When a subtype cannot preserve the promise, the relationship should be composition rather than inheritance.

## Code
```kotlin
open class Cache {
    protected val entries = mutableMapOf<String, String>()

    open fun put(key: String, value: String) {
        entries[key] = value       // post: entry exists
    }
}

// Invalid: silently drops writes, breaking the postcondition.
class ReadOnlyCache : Cache() {
    override fun put(key: String, value: String) = Unit
}
```
