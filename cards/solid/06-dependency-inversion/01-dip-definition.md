---
id: solid-dip-definition
topic: solid/dip
title: Dependency inversion principle
tags: [solid, dip, abstraction]
related: [solid-abstraction-ownership, oop-program-to-an-interface]
sources:
  - https://en.wikipedia.org/wiki/Dependency_inversion_principle
---

## Explanation
The dependency inversion principle has two parts: high-level policy should not depend on low-level details, and both should depend on abstractions. A ViewModel that calls a repository interface is high-level policy; the repository implementation that uses Retrofit or Room is a detail. By inverting the arrow, the policy stays independent of the framework and the data source can be replaced or faked in tests. The abstraction should be owned by the policy side, because the policy is the thing that needs a stable contract. This is not "every class needs an interface"; it is about the direction of the important dependencies.

## Code
```kotlin
// Policy depends on a contract it owns.
interface ArticleRepository {
    suspend fun load(): List<Article>
}

class ArticleViewModel(private val repository: ArticleRepository) : ViewModel()

// Detail implements the contract.
class NetworkArticleRepository(private val api: ArticleApi) : ArticleRepository {
    override suspend fun load() = api.articles()
}
```
