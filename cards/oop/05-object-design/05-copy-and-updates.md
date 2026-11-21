---
id: oop-copy-and-updates
topic: oop/object-design
title: Copy and updates
tags: [oop, immutability, data-class]
related: [oop-immutability, kotlin-data-classes]
sources:
  - https://kotlinlang.org/docs/data-classes.html#copying
---

## Explanation
A data class generates `copy`, which creates a new instance with selected properties changed and the rest preserved. This is the idiomatic update mechanism for immutable UI state: instead of mutating a field, produce the next state. Because `copy` is shallow, a nested mutable object is still shared, so nested state should also be immutable or replaced explicitly. In a ViewModel, state updates become expressions such as `state.copy(isLoading = true)`, which are easy to test and safe to hand to a renderer.

## Code
```kotlin
data class FormState(
    val email: String = "",
    val password: String = "",
    val isSubmitting: Boolean = false,
)

fun withEmail(state: FormState, value: String): FormState =
    state.copy(email = value)
```
