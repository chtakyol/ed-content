---
id: di-manual-di
topic: dependency-injection/foundations
title: Manual dependency injection
tags: [di, manual, container]
related: [di-what-is-dependency-injection, di-constructor-injection]
sources:
  - https://developer.android.com/training/dependency-injection/manual
---

## Explanation
Manual DI builds the object graph in application code, usually with an app container that creates and holds long-lived dependencies. The container is created in `Application`, and screens receive what they need through constructors or factories. This keeps the wiring visible and requires no annotation processor, which is often enough for a small or medium app. As the graph grows, the container can become a large manual list, which is the point where a framework such as Hilt starts to pay for itself.

## Code
```kotlin
class AppContainer(context: Context) {
    private val database = AppDatabase.create(context)
    private val api = ArticleApi.create()

    val articleRepository: ArticleRepository =
        DefaultArticleRepository(api, database.articleDao())

    val analytics: Analytics = FirebaseAnalytics()
}

class App : Application() {
    lateinit var container: AppContainer
    override fun onCreate() {
        super.onCreate()
        container = AppContainer(this)
    }
}
```
