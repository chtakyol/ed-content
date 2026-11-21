---
id: oop-dependency-injection
topic: oop/android
title: Dependency injection
tags: [oop, dependency-injection, android]
related: [solid-dip-definition, solid-manual-di-and-hilt]
sources:
  - https://developer.android.com/training/dependency-injection
---

## Explanation
Dependency injection means an object receives its collaborators instead of creating them or reaching for global singletons. Constructor injection is the simplest form and makes dependencies explicit and replaceable in tests. A container such as Hilt or Koin only automates the wiring; the design benefit comes from the constructor signature, not from the framework. Manual injection with a small factory or an application-level container is often enough for a modest app. Avoid a service locator that hides dependencies behind a global lookup, because it makes the graph opaque and harder to test.

## Code
```kotlin
class ArticleViewModel(
    private val repository: ArticleRepository,
    private val analytics: Analytics,
) : ViewModel()

// Composition root decides the concrete implementations.
val viewModel = ArticleViewModel(
    repository = DefaultArticleRepository(api, dao),
    analytics = FirebaseAnalytics(),
)
```
