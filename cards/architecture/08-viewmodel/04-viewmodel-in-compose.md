---
id: architecture-viewmodel-in-compose
topic: architecture/viewmodel
title: ViewModels in Compose
tags: [viewmodel, compose, hilt]
related: [architecture-viewmodel-scoping, architecture-factories]
sources:
  - https://developer.android.com/topic/libraries/architecture/viewmodel/viewmodel-apis
---

## Explanation
In Compose, obtain a ViewModel with `viewModel()` from `lifecycle-viewmodel-compose`; with Hilt, use `hiltViewModel()`. The function resolves the factory and the owner automatically, so the composable receives a ready instance. Create ViewModels at screen level rather than inside reusable components, so their lifetime matches a destination. Pass the ViewModel's state and action lambdas down to stateless composables instead of passing the ViewModel itself.

## Code
```kotlin
@Composable
fun NewsScreen(viewModel: NewsViewModel = viewModel()) {
    val uiState by viewModel.uiState
        .collectAsStateWithLifecycle()

    NewsList(
        articles = uiState.articles,
        onRefresh = viewModel::refresh,
    )
}
```
