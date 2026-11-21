---
id: oop-dependency
topic: oop/relationships
title: Dependency
tags: [oop, relationships, coupling]
related: [oop-association, solid-dip-definition]
sources:
  - https://refactoring.guru/design-patterns/uml
---

## Explanation
A dependency is a weaker relationship where one object uses another temporarily without storing it as a field. A function that accepts a `Clock` parameter, a use case that calls a repository for one operation, or a mapper that receives a DTO all create dependencies without ownership. Dependencies are unavoidable, but their direction matters: depend on stable abstractions and keep the dependency arrow pointing toward the code that changes less often. A class that depends on many concrete Android framework types is difficult to test on the JVM, which is why boundaries and interfaces matter.

## Code
```kotlin
class FormatDate(
    private val clock: Clock,   // dependency, not ownership
) {
    fun format(timestamp: Long): String =
        format(timestamp, clock.zone())
}
```
