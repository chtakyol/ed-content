---
id: architecture-state-holders
topic: architecture/ui
title: State holders
tags: [ui, state-holder, logic]
related: [architecture-state-hoisting, architecture-viewmodel]
sources:
  - https://developer.android.com/topic/architecture/ui-layer/stateholders
---

## Explanation
A state holder is a class that owns UI state and the logic that produces it. ViewModels are state holders scoped to a screen or navigation destination, while plain classes are state holders for reusable components and can be remembered in composition. The distinction is lifetime and responsibility: use a ViewModel when state must survive configuration changes and needs the data layer, and a plain holder when the state belongs to one component and can be hoisted. Both should expose immutable state and accept events as functions.

## Code
```kotlin
@Stable
class SearchBarState(initial: String = "") {
    var query by mutableStateOf(initial)
        private set

    fun onQueryChange(value: String) {
        query = value
    }
}
```
