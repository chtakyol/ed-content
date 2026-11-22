---
id: di-hilt-qualifiers
topic: dependency-injection/hilt
title: Hilt qualifiers
tags: [di, hilt, qualifiers]
related: [di-hilt-modules-and-bindings, di-hilt-scopes]
sources:
  - https://developer.android.com/training/dependency-injection/hilt-android
---

## Explanation
A qualifier distinguishes bindings of the same type, such as an IO dispatcher and a default dispatcher, or two different base URLs. Define a custom annotation with `@Qualifier` and apply it to both the provider and the injection site. `@Named("...")` works for simple cases but string keys are easy to mistype, so custom qualifiers are usually clearer. A missing or mismatched qualifier produces a compile-time error, which is one of Hilt's main advantages over manual wiring.

## Code
```kotlin
@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class IoDispatcher

@Module
@InstallIn(SingletonComponent::class)
object DispatcherModule {
    @Provides
    @IoDispatcher
    fun provideIoDispatcher(): CoroutineDispatcher = Dispatchers.IO
}

class ArticleRepository @Inject constructor(
    @IoDispatcher private val dispatcher: CoroutineDispatcher,
)
```
