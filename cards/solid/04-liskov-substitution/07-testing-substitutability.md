---
id: solid-testing-substitutability
topic: solid/lsp
title: Testing substitutability
tags: [solid, lsp, testing]
related: [solid-lsp-definition, oop-fakes-vs-mocks]
sources:
  - https://martinfowler.com/bliki/ContractTest.html
---

## Explanation
A contract test runs the same behavioral expectations against every implementation of an interface, which is the practical way to catch Liskov violations. Write the test suite against the abstraction, then execute it with the real implementation and the fake or alternate implementation. If a subtype cannot pass, it either violates the contract or the contract is wrong and should be narrowed. In Android, a repository contract test can cover the network implementation with a fake server and the in-memory implementation used in UI tests. This is more valuable than testing each implementation with a different set of assumptions.

## Code
```kotlin
abstract class RepositoryContract {
    abstract fun repository(): ArticleRepository

    @Test
    fun `load returns saved articles`() = runTest {
        val repo = repository()
        repo.save(article)
        assertEquals(listOf(article), repo.load())
    }
}

class FakeRepositoryTest : RepositoryContract() {
    override fun repository() = FakeArticleRepository()
}
```
