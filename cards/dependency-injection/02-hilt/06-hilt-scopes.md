---
id: di-hilt-scopes
topic: dependency-injection/hilt
title: Hilt scopes
tags: [di, hilt, scopes]
related: [di-scopes-and-lifetimes, di-hilt-components]
sources:
  - https://developer.android.com/training/dependency-injection/hilt-android
---

## Explanation
A Hilt scope annotation on a binding tells the component to reuse one instance for the lifetime of that component. `@Singleton` lives in `SingletonComponent`, `@ActivityScoped` in `ActivityComponent`, and `@ViewModelScoped` in `ViewModelComponent`. Unscoped bindings create a new instance each time they are injected. Scope only what needs to be shared, because a wider scope keeps objects and their references alive longer. A scoped binding must be installed in a component that can hold that scope, or Hilt reports a compile-time error.

## Code
```kotlin
@Singleton
class AnalyticsClient @Inject constructor()

@ActivityScoped
class ScreenTracker @Inject constructor()

@ViewModelScoped
class ArticleStateHolder @Inject constructor(
    private val repository: ArticleRepository,
)
```
