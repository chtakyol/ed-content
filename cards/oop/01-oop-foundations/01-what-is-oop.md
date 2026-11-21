---
id: oop-what-is-oop
topic: oop/foundations
title: What is object-oriented programming?
tags: [oop, fundamentals, design]
related: [oop-classes-objects-instances, oop-encapsulation-overview]
sources:
  - https://developer.android.com/topic/architecture
  - https://kotlinlang.org/docs/classes.html
---

## Explanation
Object-oriented programming organizes code around objects that combine state and behavior behind a well-defined interface. Instead of a program being a list of steps over loose data, each object owns its data and exposes operations that keep that data valid. The main tools are encapsulation, abstraction, inheritance, and polymorphism, and they exist to manage change: a caller depends on what an object promises, not on how it works inside. Android code is object-oriented whether or not you think about it, since activities, ViewModels, repositories, and adapters are all objects with state and collaborators.

## Code
```kotlin
class ReadingProgress(
    private val articleId: String,
    private var position: Int = 0,
) {
    fun advance(by: Int): ReadingProgress {
        position = (position + by).coerceAtLeast(0)
        return this
    }
}
```
