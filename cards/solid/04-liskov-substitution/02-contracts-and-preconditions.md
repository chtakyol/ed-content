---
id: solid-contracts-and-preconditions
topic: solid/lsp
title: Contracts and preconditions
tags: [solid, lsp, contracts]
related: [solid-lsp-definition, solid-postconditions-and-invariants]
sources:
  - https://martinfowler.com/bliki/DesignByContract.html
---

## Explanation
A precondition is what must be true before a method runs, such as a non-null argument or a positive page size. A subtype may weaken a precondition, accepting more inputs, but must not strengthen it by rejecting inputs the parent accepted. If the parent promises to handle an empty list, a subtype that throws on an empty list is not a valid substitute. Document preconditions at the boundary and enforce them consistently, preferably in the type or constructor. Liskov violations often start as a small extra check added to one override without noticing that callers now need to know the subtype.

## Code
```kotlin
open class Loader {
    open suspend fun load(page: Int): List<Article> {
        require(page >= 0)
        /* ... */
    }
}

// Invalid: strengthens the precondition.
class StrictLoader : Loader() {
    override suspend fun load(page: Int): List<Article> {
        require(page > 0)   // parent allowed 0
        /* ... */
    }
}
```
