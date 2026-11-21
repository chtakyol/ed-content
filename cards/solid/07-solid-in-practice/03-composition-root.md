---
id: solid-composition-root
topic: solid/practice
title: The composition root
tags: [solid, practice, di]
related: [solid-manual-di-and-hilt, oop-dependency-injection]
sources:
  - https://developer.android.com/training/dependency-injection/manual
---

## Explanation
The composition root is the single place where the object graph is assembled: concrete implementations are chosen and passed into constructors. Keeping this wiring in one place means the rest of the app depends only on abstractions and never constructs its own collaborators. In a small Android app it can be an `AppContainer` created in `Application`; with Hilt it is the generated component graph, configured by modules. The composition root is allowed to know every concrete type, because that is its job. If construction logic appears in a ViewModel or a composable, the graph has leaked and tests become harder.

## Code
```kotlin
class AppContainer(context: Context) {
    private val api = ArticleApi.create()
    private val dao = AppDatabase.create(context).articleDao()

    val articleRepository: ArticleRepository =
        DefaultArticleRepository(api, dao)

    val analytics: Analytics = FirebaseAnalytics()
}

class ArticleViewModelFactory(
    private val container: AppContainer,
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T =
        ArticleViewModel(container.articleRepository) as T
}
```
