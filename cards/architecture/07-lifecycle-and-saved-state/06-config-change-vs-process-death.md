---
id: architecture-config-change-vs-process-death
topic: architecture/lifecycle
title: Configuration change vs process death
tags: [state, lifecycle, process-death]
related: [architecture-viewmodel-vs-saved-state, architecture-saved-instance-state]
sources:
  - https://developer.android.com/topic/libraries/architecture/saving-states
---

## Explanation
A configuration change, such as rotation or a theme switch, destroys and recreates the activity but keeps the process and its `ViewModelStore` alive, so ViewModels survive and expensive reloads can be avoided. Process death kills everything, including ViewModels, and the app is recreated later with only saved instance state. Confusing the two leads to either losing user input on process death or over-engineering rotation. Decide separately what must survive each case.

## Code
```kotlin
// Configuration change: the ViewModel survives.
val viewModel: NewsViewModel = viewModel()

// Process death: only SavedStateHandle / saved state survives.
val id: String? = savedStateHandle["articleId"]
```
