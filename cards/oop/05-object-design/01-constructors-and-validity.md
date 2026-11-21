---
id: oop-constructors-and-validity
topic: oop/object-design
title: Constructors and validity
tags: [oop, constructors, invariants]
related: [oop-invariants, oop-validation-at-boundaries]
sources:
  - https://kotlinlang.org/docs/classes.html
---

## Explanation
A constructor is the first chance to make an object valid, and it should leave no way to create an instance that violates the class's rules. Validate required values, normalize input such as trimming strings, and reject impossible combinations with `require` or a typed failure. If construction can fail for expected reasons, expose a factory that returns a result instead of throwing from every call site. A constructor that accepts anything and relies on callers to call an `init()` or validate later makes every downstream method defensive and every invalid state possible.

## Code
```kotlin
class Page(
    val index: Int,
    val size: Int,
) {
    init {
        require(index >= 0) { "index must be non-negative" }
        require(size > 0) { "size must be positive" }
    }
}
```
