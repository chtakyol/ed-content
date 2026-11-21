---
id: solid-when-not-to-abstract
topic: solid/dip
title: When not to abstract
tags: [solid, dip, tradeoffs]
related: [oop-over-abstraction, solid-over-engineering]
sources:
  - https://martinfowler.com/bliki/RuleOfThree.html
---

## Explanation
An abstraction is worth its cost when there is a real second implementation, a boundary that needs isolation, or a detail likely to change. A class used in one place with no test double and no alternative is often clearer as a concrete dependency. Premature interfaces double the number of types and force every reader to jump between the contract and the only implementation. Wait for the second use case or the first test that genuinely needs a seam, then extract the interface from the existing class. Dependency inversion is about direction, not about adding a layer for every dependency.

## Code
```kotlin
// Fine: one implementation, no substitution needed.
class DateFormatter(private val clock: Clock) {
    fun relative(timestamp: Long): String = /* ... */
}

// Add an interface when a real second implementation appears.
interface DateFormatter { fun relative(timestamp: Long): String }
```
