---
id: architecture-viewmodel-scoping
topic: architecture/viewmodel
title: ViewModel scoping
tags: [viewmodel, scope, nav-graph]
related: [architecture-viewmodel-in-compose, architecture-viewmodel-lifecycle]
sources:
  - https://developer.android.com/topic/libraries/architecture/viewmodel/viewmodel-apis
---

## Explanation
A ViewModel lives as long as its `ViewModelStoreOwner`. In Compose, `viewModel()` uses the nearest owner from `LocalViewModelStoreOwner`, which is usually the activity or the current navigation destination. Passing an explicit owner scopes it to a parent navigation graph, and `rememberViewModelStoreOwner()` scopes it to a composable call site for dynamic UI. Scope determines sharing and lifetime: two screens that need the same state must share an owner, and two independent screens should not.

## Code
```kotlin
@Composable
fun DetailScreen(navController: NavController) {
    val entry = remember {
        navController.getBackStackEntry("parent")
    }
    val shared: SharedViewModel = viewModel(entry)
}
```
