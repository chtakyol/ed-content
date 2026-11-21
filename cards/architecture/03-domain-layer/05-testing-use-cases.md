---
id: architecture-testing-use-cases
topic: architecture/domain
title: Testing use cases
tags: [domain, testing, use-case]
related: [architecture-use-cases, architecture-use-case-dependencies]
sources:
  - https://developer.android.com/topic/architecture/domain-layer
---

## Explanation
Because use cases are plain Kotlin, they are tested with ordinary JUnit tests and fake repositories. Test the rule, its branches, and its interaction with dependencies; no emulator or Robolectric is involved. Fakes that return flows are usually clearer than mocks, and suspending functions can be driven with `runTest`. If a use case is hard to test, it usually means a dependency is concrete or an Android type leaked into the constructor.

## Code
```kotlin
@Test
fun `limits the number of articles`() = runTest {
    val repository = FakeNewsRepository(List(30) { article(it) })
    val useCase = GetLatestNews(repository)

    assertEquals(20, useCase(limit = 20).size)
}
```
