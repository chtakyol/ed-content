---
id: di-hilt-testing
topic: dependency-injection/hilt
title: Hilt testing
tags: [di, hilt, testing]
related: [di-and-testability, di-hilt-modules-and-bindings]
sources:
  - https://developer.android.com/training/dependency-injection/hilt-testing
---

## Explanation
`@HiltAndroidTest` generates a test component, and `@UninstallModules` removes production modules so a test can replace them with fakes. `@BindValue` injects a test instance, and `@TestInstallIn` replaces a module for a whole test source set. Use `HiltTestApplication` or the generated test runner so the application is set up correctly. Prefer replacing one boundary, such as a repository or a clock, and keep the rest of the graph real so the test exercises realistic wiring. Remember to reset state between tests when a fake is shared.

## Code
```kotlin
@HiltAndroidTest
@UninstallModules(RepositoryModule::class)
class ArticleScreenTest {
    @get:Rule val hiltRule = HiltAndroidRule(this)

    @BindValue @JvmField
    val repository: ArticleRepository = FakeArticleRepository(listOf(article))

    @Before fun setUp() = hiltRule.inject()
}
```
