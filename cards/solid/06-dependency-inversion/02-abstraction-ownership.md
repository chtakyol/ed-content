---
id: solid-abstraction-ownership
topic: solid/dip
title: Who owns the abstraction?
tags: [solid, dip, boundaries]
related: [solid-dip-definition, solid-repository-interfaces]
sources:
  - https://martinfowler.com/articles/dipInTheWild.html
---

## Explanation
The abstraction should live on the side that depends on it, not on the side that implements it. A repository interface belongs with the domain or UI policy that calls it, while the network and database implementations belong in the data layer. This keeps the dependency arrow pointing inward and prevents a framework detail from becoming a shared contract. A practical test is to ask whether the interface would still make sense if the current implementation were replaced tomorrow. If its methods mention `Response`, `Cursor`, or `Bundle`, the abstraction is owned by the detail rather than the policy.

## Code
```kotlin
// Domain owns the contract.
package domain

interface ArticleRepository {
    suspend fun load(): List<Article>
}

// Data layer owns the implementation.
package data

class RetrofitArticleRepository(
    private val api: ArticleApi,
) : ArticleRepository {
    override suspend fun load() = api.articles().map { it.toDomain() }
}
```
