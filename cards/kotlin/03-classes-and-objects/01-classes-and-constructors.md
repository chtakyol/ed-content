---
id: kotlin-classes-and-constructors
topic: kotlin/classes
title: Classes and constructors
tags: [kotlin, classes, constructors]
related: [kotlin-properties-and-backing-fields, oop-constructors-and-validity]
sources:
  - https://kotlinlang.org/docs/classes.html
---

## Explanation
A Kotlin class declares its primary constructor in the header, and parameters marked `val` or `var` become properties automatically. Secondary constructors are available but are usually a sign that defaults or factory functions would express the intent better. Initializer blocks run in declaration order alongside property initializers, which makes constructor validation predictable. In Android, classes such as a `ViewModel` or a repository take their dependencies as constructor parameters so they can be created in tests without a framework.

## Code
```kotlin
class ArticleRepository(
    private val api: ArticleApi,
    private val dao: ArticleDao,
)

class EmptyState private constructor() {
    companion object { val instance = EmptyState() }
}
```
