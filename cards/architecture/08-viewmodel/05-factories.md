---
id: architecture-factories
topic: architecture/viewmodel
title: ViewModel factories
tags: [viewmodel, factory, di]
related: [architecture-creation-extras, architecture-viewmodel-in-compose]
sources:
  - https://developer.android.com/topic/libraries/architecture/viewmodel/viewmodel-factories
---

## Explanation
A ViewModel factory tells the framework how to construct a ViewModel that needs dependencies. Implementations of `ViewModelProvider.Factory` receive `CreationExtras` and return an instance; modern code often uses the `viewModelFactory { initializer { ... } }` DSL or a DI framework's factory instead of writing a class per ViewModel. The factory is where constructor injection meets the Android lifecycle. If a ViewModel has no dependencies, the default factory is enough.

## Code
```kotlin
val factory = viewModelFactory {
    initializer {
        NewsViewModel(NewsRepository(...))
    }
}

val viewModel: NewsViewModel = viewModel(factory = factory)
```
