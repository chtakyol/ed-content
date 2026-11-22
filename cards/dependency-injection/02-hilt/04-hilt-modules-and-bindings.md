---
id: di-hilt-modules-and-bindings
topic: dependency-injection/hilt
title: Hilt modules and bindings
tags: [di, hilt, modules]
related: [di-hilt-components, di-hilt-qualifiers]
sources:
  - https://developer.android.com/training/dependency-injection/hilt-android
---

## Explanation
A Hilt module is annotated with `@Module` and `@InstallIn` to declare which component it contributes to. Use `@Provides` for third-party types and constructed instances, and `@Binds` for mapping an interface to an implementation when the implementation is injectable. `@Binds` functions are abstract and live in an abstract class or interface, which avoids constructing the object manually. Keep modules focused on one area, and prefer constructor injection for your own classes so modules only cover what Hilt cannot construct.

## Code
```kotlin
@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {
    @Binds
    abstract fun bindArticleRepository(
        impl: DefaultArticleRepository,
    ): ArticleRepository
}

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {
    @Provides
    fun provideApi(): ArticleApi = ArticleApi.create()
}
```
