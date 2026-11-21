---
id: architecture-api-and-impl
topic: architecture/modularization
title: API and implementation modules
tags: [modularization, api, encapsulation]
related: [architecture-cohesion-and-coupling, architecture-convention-plugins]
sources:
  - https://developer.android.com/topic/modularization/patterns
---

## Explanation
For a module that is expensive to compile or has multiple implementations, split it into an `api` module containing interfaces and models and an `impl` module containing the implementation. Other modules depend on `api` and receive the implementation through dependency injection, so they never compile against internals. This reduces rebuilds and prevents accidental coupling. The split is worth it for large features or shared infrastructure, not for every small module.

## Code
```kotlin
// :feature:news:api
interface NewsNavigator {
    fun openArticle(id: String)
}

// :feature:news:impl
class DefaultNewsNavigator @Inject constructor(
    private val navController: NavHostController,
) : NewsNavigator
```
