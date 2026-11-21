---
id: oop-invariants
topic: oop/encapsulation
title: Invariants
tags: [oop, encapsulation, correctness]
related: [oop-properties-vs-fields, oop-constructors-and-validity]
sources:
  - https://martinfowler.com/bliki/Invariant.html
---

## Explanation
An invariant is a condition that must always hold for an object to be valid, such as a quantity never being negative or a start date never being after an end date. The object should establish its invariants on construction and preserve them through every public operation. When invariants are enforced inside the object, callers cannot create an invalid instance, and every method can assume the rules hold. When they are enforced in scattered UI code, different callers eventually disagree, and the invalid state shows up far from its cause.

## Code
```kotlin
class DateRange(start: Long, end: Long) {
    val start: Long = start
    val end: Long = end

    init {
        require(start <= end) { "start must not be after end" }
    }

    fun extendTo(newEnd: Long): DateRange =
        DateRange(start, maxOf(end, newEnd))
}
```
