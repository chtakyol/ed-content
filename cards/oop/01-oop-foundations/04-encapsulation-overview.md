---
id: oop-encapsulation-overview
topic: oop/foundations
title: Encapsulation
tags: [oop, encapsulation, fundamentals]
related: [oop-visibility-modifiers, oop-invariants]
sources:
  - https://kotlinlang.org/docs/classes.html
---

## Explanation
Encapsulation means hiding an object's internal representation behind operations that preserve its rules. Callers ask the object to do something instead of reaching in and editing fields, so the object can validate input, keep related values consistent, and change its internals without breaking clients. In Kotlin this usually means private properties plus public functions or read-only properties. It is not the same as adding a getter and setter for every field: blindly exposing both recreates public fields with extra steps and gives the object no chance to protect its invariants.

## Code
```kotlin
class ShoppingCart {
    private val items = mutableListOf<Item>()

    fun add(item: Item) {
        require(item.quantity > 0)
        items += item
    }

    fun total(): Int = items.sumOf { it.price }
}
```
