---
id: di-hilt-viewmodel-and-compose
topic: dependency-injection/hilt
title: Hilt with ViewModel and Compose
tags: [di, hilt, compose, viewmodel]
related: [architecture-viewmodel, di-hilt-scopes]
sources:
  - https://developer.android.com/training/dependency-injection/hilt-jetpack
---

## Explanation
Annotate a ViewModel with `@HiltViewModel` and inject its dependencies through the constructor. Activities and Fragments annotated with `@AndroidEntryPoint` obtain it with `by viewModels()`, and Compose screens obtain it with `hiltViewModel()`. The ViewModel is scoped to the nearest `ViewModelStoreOwner`, which is usually the Activity or a navigation back stack entry, so a destination-scoped ViewModel is cleared when that destination leaves the back stack. This integrates Hilt with the Jetpack lifecycle instead of requiring a custom factory for every screen.

## Code
```kotlin
@HiltViewModel
class ArticleViewModel @Inject constructor(
    private val repository: ArticleRepository,
) : ViewModel()

@Composable
fun ArticleScreen(
    viewModel: ArticleViewModel = hiltViewModel(),
) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    ArticleContent(state)
}
```
