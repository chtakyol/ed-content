---
id: kotlin-inheritance-and-open
topic: kotlin/classes
title: Inheritance and open
tags: [kotlin, inheritance, open]
related: [oop-inheritance-overview, oop-open-and-final]
sources:
  - https://kotlinlang.org/docs/inheritance.html
---

## Explanation
Classes and members in Kotlin are final by default, so inheritance is opt-in through the `open` modifier. This prevents accidental subclassing and makes the cost of an extension point explicit. An overriding member must use `override`, and it stays open unless marked `final`. Prefer small interfaces or composition over deep subclass trees, and when a class is open, document which members are meant to be overridden. In Android, base activities and base view holders are common sources of fragile inheritance, so keep them minimal.

## Code
```kotlin
open class Screen {
    open fun onStart() = Unit
}

class ArticleScreen : Screen() {
    override fun onStart() {
        loadArticles()
    }
}
```
