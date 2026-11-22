---
id: di-service-locator-vs-di
topic: dependency-injection/foundations
title: Service locator vs DI
tags: [di, service-locator, design]
related: [di-constructor-injection, di-what-is-dependency-injection]
sources:
  - https://developer.android.com/training/dependency-injection
---

## Explanation
A service locator is a global registry that a class queries for dependencies, while DI passes dependencies in from outside. A locator is convenient because any class can ask for anything, but it hides dependencies, makes tests depend on global state, and turns missing registrations into runtime failures. DI makes the dependency graph visible in constructors and lets the composition root decide implementations. Some frameworks provide a locator-like API internally, but application code should still depend on constructor parameters rather than reaching into a global object.

## Code
```kotlin
// Locator: hidden dependency, global state.
class ArticleViewModel : ViewModel() {
    private val repository = ServiceLocator.repository
}

// DI: explicit dependency, easy to fake.
class ArticleViewModel(
    private val repository: ArticleRepository,
) : ViewModel()
```
