---
id: di-and-testability
topic: dependency-injection/foundations
title: DI and testability
tags: [di, testing, fakes]
related: [oop-fakes-vs-mocks, di-constructor-injection]
sources:
  - https://developer.android.com/training/dependency-injection
---

## Explanation
Constructor injection is what makes a class testable without a device or a network: a test constructs the class with an in-memory fake and asserts the behavior. Global singletons and service locators make this harder because the test cannot replace the hidden dependency without process-wide setup. Design the seams around the behavior you need to fake, such as a repository, a clock, or an analytics facade. Keep fakes small and faithful to the contract, and test the real implementation separately when it contains logic worth verifying.

## Code
```kotlin
class FakeArticleRepository(
    private val articles: List<Article>,
) : ArticleRepository {
    override suspend fun load() = articles
}

@Test
fun `shows first article`() = runTest {
    val viewModel = ArticleViewModel(FakeArticleRepository(listOf(article)))
    assertEquals(article.title, viewModel.state.value.title)
}
```
