---
id: kotlin-smart-casts
topic: kotlin/null-safety
title: Smart casts
tags: [kotlin, null-safety, type-system]
related: [kotlin-type-checks-and-casts, kotlin-nullable-types]
sources:
  - https://kotlinlang.org/docs/typecasts.html#smart-casts
---

## Explanation
After a null check, `is` check, or `when` branch, the compiler smart-casts a value to the narrowed type for the rest of that scope, so you do not need an explicit cast. Smart casts work for local `val` values and stable properties; a mutable property or a property from another module may not be narrowed because it could change between the check and the use. Use a local copy when you need a stable smart cast on a mutable property. This is why `when (state) { is UiState.Success -> state.articles }` compiles without a cast inside the branch.

## Code
```kotlin
fun titleOf(state: UiState): String? {
    if (state is UiState.Success && state.articles.isNotEmpty()) {
        return state.articles.first().title
    }
    return null
}
```
