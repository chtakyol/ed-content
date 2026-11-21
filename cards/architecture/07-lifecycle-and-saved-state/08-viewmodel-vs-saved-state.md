---
id: architecture-viewmodel-vs-saved-state
topic: architecture/lifecycle
title: ViewModel vs saved state
tags: [state, viewmodel, savedstate]
related: [architecture-config-change-vs-process-death, architecture-savedstatehandle]
sources:
  - https://developer.android.com/topic/libraries/architecture/saving-states
---

## Explanation
A ViewModel holds in-memory state for the lifetime of a screen and survives configuration changes, but it is cleared on process death. Saved state, through `SavedStateHandle` or `rememberSaveable`, survives process death but is limited to small serializable values. Use the ViewModel for loaded data and derived UI state, and saved state for the identifiers and drafts needed to rebuild the screen. Putting everything in saved state is slow and unnecessary; putting everything in the ViewModel loses state after process death.

## Code
```kotlin
class ArticleViewModel(
    savedStateHandle: SavedStateHandle,
    repository: ArticleRepository,
) : ViewModel() {
    private val articleId: String =
        checkNotNull(savedStateHandle["articleId"])

    val article = repository.observeArticle(articleId)
}
```
