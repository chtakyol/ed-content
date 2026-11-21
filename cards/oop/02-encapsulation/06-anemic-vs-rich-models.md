---
id: oop-anemic-vs-rich-models
topic: oop/encapsulation
title: Anemic vs rich models
tags: [oop, encapsulation, domain-model]
related: [oop-tell-dont-ask, oop-what-is-oop]
sources:
  - https://martinfowler.com/bliki/AnemicDomainModel.html
---

## Explanation
An anemic model is a set of data classes with no behavior, while the rules live in services that read and write their fields. A rich model keeps the rules next to the data they protect, so a `Cart` knows how to add an item and a `DateRange` knows whether it overlaps another range. Anemic models are not always wrong: DTOs and UI state are intentionally data-only because they cross a boundary and have no behavior to protect. The problem starts when domain concepts that have invariants are reduced to bags of settable fields and every caller must remember the rules.

## Code
```kotlin
// Anemic: every caller must remember the rule.
data class Cart(val items: MutableList<Item>, var total: Int)

// Rich: the object protects its own total.
class Cart {
    private val items = mutableListOf<Item>()
    val total: Int get() = items.sumOf { it.price }

    fun add(item: Item) {
        require(item.quantity > 0)
        items += item
    }
}
```
