---
id: architecture-events-vs-state
topic: architecture/ui
title: Events vs state
tags: [ui, events, state]
related: [architecture-handling-events, architecture-ui-state]
sources:
  - https://developer.android.com/topic/architecture/ui-layer/events
---

## Explanation
State always exists and describes what is on screen; events happen at a moment and are consumed once. A loading flag, an error field, and a list are state. A snackbar that should appear once, a navigation command, or a toast is an event. Treating an event as persistent state causes it to replay after rotation or recomposition, while treating state as an event loses information the screen needs to keep rendering.

## Code
```kotlin
// State: rendered continuously.
data class FormUiState(
    val email: String = "",
    val isSaving: Boolean = false,
)

// Event: consumed once.
sealed interface FormEvent {
    data object Saved : FormEvent
}
```
