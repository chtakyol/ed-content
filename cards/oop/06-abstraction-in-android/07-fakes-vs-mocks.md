---
id: oop-fakes-vs-mocks
topic: oop/android
title: Fakes vs mocks
tags: [oop, testing, test-doubles]
related: [oop-program-to-an-interface, oop-repository-abstraction]
sources:
  - https://martinfowler.com/bliki/TestDouble.html
---

## Explanation
A fake is a working implementation with simplified behavior, such as an in-memory repository, while a mock is an object that records calls and is verified by the test framework. Fakes tend to produce clearer, less brittle tests because they verify outcomes rather than interaction sequences, and they can be reused across many tests. Mocks are useful for checking a specific side effect, such as an analytics event, or for a dependency that is expensive to emulate. Whichever you choose, depend on a small interface so the test double is simple, and avoid mocking types you do not own, such as Android framework classes.

## Code
```kotlin
class FakeArticleRepository : ArticleRepository {
    private val items = mutableListOf<Article>()
    override suspend fun load() = items.toList()
    override suspend fun save(article: Article) { items += article }
}

@Test
fun `saved article is returned`() = runTest {
    val repository = FakeArticleRepository()
    repository.save(article)
    assertEquals(listOf(article), repository.load())
}
```
