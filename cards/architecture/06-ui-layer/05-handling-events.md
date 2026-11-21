---
id: architecture-handling-events
topic: architecture/ui
title: Handling events in the ViewModel
tags: [ui, events, viewmodel]
related: [architecture-events-vs-state, architecture-anti-patterns]
sources:
  - https://developer.android.com/topic/architecture/ui-layer/events
---

## Explanation
The recommended approach is to process user events in the state holder immediately and express the outcome as a state change rather than sending an event object down to the UI. A save action, for example, updates an `isSaving` flag and then an `isSaved` or error field, and the composable reacts to that state. Events that truly cannot be state, such as a one-off snackbar message, should be modeled explicitly and consumed once, but they are the exception rather than the default.

## Code
```kotlin
class FormViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(FormUiState())
    val uiState = _uiState.asStateFlow()

    fun onSave() = viewModelScope.launch {
        _uiState.update { it.copy(isSaving = true) }
        repository.save()
        _uiState.update { it.copy(isSaving = false, isSaved = true) }
    }
}
```
