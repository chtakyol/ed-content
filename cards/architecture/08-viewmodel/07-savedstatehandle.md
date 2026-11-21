---
id: architecture-savedstatehandle
topic: architecture/viewmodel
title: SavedStateHandle
tags: [viewmodel, savedstate, navigation]
related: [architecture-viewmodel-vs-saved-state, architecture-creation-extras]
sources:
  - https://developer.android.com/topic/libraries/architecture/viewmodel/viewmodel-savedstate
---

## Explanation
`SavedStateHandle` is a key-value store owned by a ViewModel that survives process death by being written into the saved instance state. It is ideal for navigation arguments and small drafts that must be restored, such as an article id or a search query. Read values as flows with `getStateFlow` to observe changes. It is not a database: keep values small and do not store large object graphs in it.

## Code
```kotlin
class ArticleViewModel(
    private val handle: SavedStateHandle,
    repository: ArticleRepository,
) : ViewModel() {
    val articleId: StateFlow<String> =
        handle.getStateFlow("articleId", "")

    val article = articleId
        .flatMapLatest(repository::observeArticle)
}
```
