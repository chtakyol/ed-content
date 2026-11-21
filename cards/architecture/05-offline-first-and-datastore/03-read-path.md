---
id: architecture-read-path
topic: architecture/offline
title: The offline read path
tags: [offline, read, flow]
related: [architecture-local-source, architecture-write-path]
sources:
  - https://developer.android.com/topic/architecture/data-layer/offline-first
---

## Explanation
The offline read path is short: the UI observes a repository flow, the repository observes the database, and the database emits whenever rows change. A refresh writes new rows and the same flow emits again, so no screen needs a manual reload after sync. This is the practical payoff of using the local store as the single source of truth. The flow should be collected in a lifecycle-aware way so observation stops when the screen is not visible.

## Code
```kotlin
class NotesViewModel(
    repository: NotesRepository,
) : ViewModel() {
    val uiState = repository.observeNotes()
        .map { NotesUiState(notes = it) }
        .stateIn(
            viewModelScope,
            SharingStarted.WhileSubscribed(5_000),
            NotesUiState(),
        )
}
```
