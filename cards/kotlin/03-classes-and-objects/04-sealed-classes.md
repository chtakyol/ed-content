---
id: kotlin-sealed-classes
topic: kotlin/classes
title: Sealed classes
tags: [kotlin, sealed, state]
related: [kotlin-when-expressions, oop-sealed-hierarchies]
sources:
  - https://kotlinlang.org/docs/sealed-classes.html
---

## Explanation
A sealed class or interface restricts its direct subclasses to the same package and module, which turns the hierarchy into a closed set the compiler knows about. A `when` over a sealed type must handle every subtype or include an `else`, so adding a new state forces every consumer to be updated. This is why sealed hierarchies are the standard way to model screen state, navigation events, and operation results in Android. Prefer a sealed interface when the subtypes only need to implement a contract, and a sealed class when they share state or behavior.

## Code
```kotlin
sealed interface UiState {
    data object Loading : UiState
    data class Success(val articles: List<Article>) : UiState
    data class Error(val message: String) : UiState
}

fun render(state: UiState) = when (state) {
    UiState.Loading -> showSpinner()
    is UiState.Success -> showList(state.articles)
    is UiState.Error -> showError(state.message)
}
```
