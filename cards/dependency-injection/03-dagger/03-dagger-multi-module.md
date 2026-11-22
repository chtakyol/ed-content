---
id: dagger-multi-module
topic: dependency-injection/dagger
title: Dagger in multi-module projects
tags: [di, dagger, modularization]
related: [di-hilt-multi-module, architecture-modularization]
sources:
  - https://developer.android.com/training/dependency-injection/dagger-multi-module
---

## Explanation
In a multi-module Dagger project, components and modules are spread across modules, and the app module assembles them. A feature module can expose a Dagger module or a component interface, while the app component includes it. Component dependencies and subcomponents let a narrower component use a parent's bindings without granting access in the other direction. Keep the graph direction aligned with the module dependency direction, and avoid exposing internal bindings through public APIs. Hilt reduces this bookkeeping by generating the component hierarchy.

## Code
```kotlin
// feature module
@Module
class ArticlesModule {
    @Provides fun repository(api: ArticleApi): ArticleRepository =
        NetworkArticleRepository(api)
}

// app component
@Singleton
@Component(modules = [NetworkModule::class, ArticlesModule::class])
interface AppComponent
```
