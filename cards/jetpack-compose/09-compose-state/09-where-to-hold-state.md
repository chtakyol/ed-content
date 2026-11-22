---
id: compose-where-to-hold-state
topic: jetpack-compose/state
title: Where to hold state
tags: [compose, state, architecture]
related: [compose-state-hoisting, architecture-viewmodel]
sources:
  - https://developer.android.com/develop/ui/compose/state
  - https://developer.android.com/develop/ui/compose/state-hoisting
---

## Explanation
Hold state at the lowest level that satisfies its lifespan and sharing needs. A single composable can own purely visual state with `remember`. A parent composable should own state shared by a few children, using `rememberSaveable` if it must survive recreation. A `ViewModel` should own screen state that involves business logic, asynchronous work, or navigation, because it survives configuration changes and is testable without the UI. A repository owns data that must outlive the screen. Moving state higher than necessary makes the composable less reusable; moving it lower makes it impossible to share.

## Code
```kotlin
// Local visual state: remember.
var expanded by remember { mutableStateOf(false) }

// Screen state: ViewModel.
class ArticleViewModel(private val repository: ArticleRepository) : ViewModel() {
    val state: StateFlow<ArticleUiState> = /* ... */
}

@Composable
fun ArticleScreen(viewModel: ArticleViewModel) {
    val state by viewModel.state.collectAsStateWithLifecycle()
}
```
