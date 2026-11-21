---
id: solid-lsp-definition
topic: solid/lsp
title: Liskov substitution principle
tags: [solid, lsp, contracts]
related: [oop-overriding, solid-contracts-and-preconditions]
sources:
  - https://en.wikipedia.org/wiki/Liskov_substitution_principle
---

## Explanation
The Liskov substitution principle says a subtype must be usable wherever its supertype is expected, without the caller needing to know which implementation it received. The subtype may add behavior, but it must honor the parent's contract: it cannot require more from callers, promise less in return, or throw exceptions the parent did not allow. A violation often looks like `if (animal is Ostrich) skipFly()` in code that was written against `Bird`. The test is behavioral, not syntactic: if swapping in the subtype breaks a caller, the inheritance relationship is wrong.

## Code
```kotlin
interface Repository<T> {
    suspend fun load(): List<T>
}

// Substitutable: still returns a list, does not change the contract.
class CachedRepository<T>(
    private val delegate: Repository<T>,
) : Repository<T> {
    private var cache: List<T>? = null
    override suspend fun load(): List<T> = cache ?: delegate.load().also { cache = it }
}
```
