---
id: solid-manual-di-and-hilt
topic: solid/dip
title: Manual DI and Hilt
tags: [solid, dip, dependency-injection]
related: [oop-dependency-injection, solid-composition-root]
sources:
  - https://developer.android.com/training/dependency-injection
---

## Explanation
Dependency inversion needs a place to choose the concrete implementation and construct the graph. Manual injection with a small container is enough for many apps: a factory or application-scoped object creates the repository and passes it to the ViewModel factory. Hilt automates the same idea with annotations, generated components, and scopes, which helps as the graph grows. The principle is satisfied by the constructor depending on an interface either way; the container only decides which implementation to supply. Choose the lightest mechanism that keeps the wiring visible and testable, and avoid a service locator that hides dependencies inside call sites.

## Code
```kotlin
// Manual composition root
class AppContainer(context: Context) {
    private val api = ArticleApi.create()
    private val dao = AppDatabase.create(context).articleDao()
    val repository: ArticleRepository = DefaultArticleRepository(api, dao)
}

// Hilt
@Module
@InstallIn(SingletonComponent::class)
object DataModule {
    @Provides
    fun repository(api: ArticleApi, dao: ArticleDao): ArticleRepository =
        DefaultArticleRepository(api, dao)
}
```
