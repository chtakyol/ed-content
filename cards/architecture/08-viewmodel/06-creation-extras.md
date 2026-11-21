---
id: architecture-creation-extras
topic: architecture/viewmodel
title: CreationExtras
tags: [viewmodel, factory, creation-extras]
related: [architecture-factories, architecture-savedstatehandle]
sources:
  - https://developer.android.com/topic/libraries/architecture/viewmodel/viewmodel-factories
---

## Explanation
`CreationExtras` carries the context a factory needs to build a ViewModel, such as the application, the `SavedStateHandle`, and the default arguments. It replaces the older `ViewModelProvider.Factory.create(modelClass)` signature for modern factories and lets the same factory serve different owners. DI integrations read from these extras to supply assisted dependencies. Understanding extras explains where `SavedStateHandle` comes from when you call `viewModel()`.

## Code
```kotlin
val factory = viewModelFactory {
    initializer {
        val handle = createSavedStateHandle()
        ArticleViewModel(handle, repository)
    }
}

val viewModel: ArticleViewModel = viewModel(factory = factory)
```
