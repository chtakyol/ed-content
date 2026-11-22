---
id: dagger-basics
topic: dependency-injection/dagger
title: Dagger basics
tags: [di, dagger, fundamentals]
related: [di-hilt-overview, dagger-android]
sources:
  - https://developer.android.com/training/dependency-injection/dagger-basics
---

## Explanation
Dagger is a compile-time DI framework: annotate constructors with `@Inject`, declare modules with `@Provides` or `@Binds`, and define a component that exposes the graph. Dagger generates the wiring code, so missing bindings become compile errors and there is no reflection at runtime. The component is the entry point that supplies instances, and scopes control reuse. Hilt is built on Dagger and adds Android lifecycle components, so learning Dagger's vocabulary helps even when Hilt supplies most of the structure.

## Code
```kotlin
@Module
class NetworkModule {
    @Provides fun api(): ArticleApi = ArticleApi.create()

    @Provides fun repository(api: ArticleApi): ArticleRepository =
        NetworkArticleRepository(api)
}

@Singleton
@Component(modules = [NetworkModule::class])
interface AppComponent {
    fun inject(activity: MainActivity)
}
```
