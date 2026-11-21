---
id: oop-classes-objects-instances
topic: oop/foundations
title: Classes, objects, and instances
tags: [oop, fundamentals, classes]
related: [oop-what-is-oop, oop-state-behavior-identity]
sources:
  - https://kotlinlang.org/docs/classes.html
---

## Explanation
A class is a blueprint that describes the state and behavior its instances will have, and an object is a concrete value created from that blueprint. Each instance gets its own copy of the instance state, while behavior is shared through the class. In Kotlin, `object` declarations create a single instance directly, and companion objects attach shared members to a class. The distinction matters when reasoning about Android code: an `ArticleAdapter` class describes how adapters behave, while the adapter instance created by a fragment holds the current list and is the thing that lives and dies with the screen.

## Code
```kotlin
class Counter {
    private var value = 0

    fun increment() {
        value++
    }
}

val first = Counter()
val second = Counter()
first.increment()   // second.value is still 0
```
