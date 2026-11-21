---
id: solid-testability
topic: solid/dip
title: Testability
tags: [solid, dip, testing]
related: [oop-fakes-vs-mocks, solid-lsp-definition]
sources:
  - https://developer.android.com/training/testing/fundamentals
---

## Explanation
Dependency inversion is what makes fast JVM tests possible for Android code. When a ViewModel depends on a repository interface, a test can pass an in-memory fake and run without an emulator, a network, or a database. When it constructs a Retrofit service directly, the test needs the whole stack or a mocking framework that reaches into static state. Testability is therefore a useful signal: if a class is hard to test, its dependencies are probably pointing at details. Keep framework types at the edges, inject interfaces at the policy boundary, and test behavior through the contract rather than through implementation details.

## Code
```kotlin
class FakeArticleRepository(
    private val articles: List<Article> = emptyList(),
) : ArticleRepository {
    override fun observe() = flowOf(articles)
    override suspend fun refresh() = Result.success(Unit)
    override suspend fun markRead(id: ArticleId) = Result.success(Unit)
}

@Test
fun `shows content`() = runTest {
    val vm = ArticleViewModel(FakeArticleRepository(listOf(article)))
    assertEquals(ArticleUiState.Content(listOf(article)), vm.state.value)
}
```
