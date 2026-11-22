---
id: di-what-is-dependency-injection
topic: dependency-injection/foundations
title: What is dependency injection?
tags: [di, fundamentals, dependencies]
related: [di-manual-di, solid-dip-definition]
sources:
  - https://developer.android.com/training/dependency-injection
---

## Explanation
Dependency injection means a class receives the objects it depends on instead of creating them itself. The class declares its needs in a constructor, and a caller or container supplies them. This makes dependencies explicit, lets tests substitute fakes, and keeps a class from being tied to a specific network client, database, or clock. DI is a design technique, not a library: you can do it with a few factory functions, and frameworks such as Hilt or Dagger only automate the wiring. The core benefit is the constructor signature that tells you exactly what a class needs.

## Code
```kotlin
// Without DI: the class creates and hides its dependency.
class ArticleViewModel {
    private val repository = NetworkArticleRepository()
}

// With DI: the dependency is explicit and replaceable.
class ArticleViewModel(
    private val repository: ArticleRepository,
) : ViewModel()
```
