---
id: activity-process-death-and-restoration
topic: activities/foundations
title: Process death and restoration
tags: [activities, lifecycle, saved-state]
related: [activity-saving-instance-state, activity-configuration-changes]
sources:
  - https://developer.android.com/guide/components/activities/process-lifecycle
---

## Explanation
When the system kills a process, it may later recreate the activity with the saved instance state bundle, so the user returns to a screen that looks similar. `ViewModel` state is gone, because the process died; only data written to `onSaveInstanceState`, `SavedStateHandle`, or persistent storage comes back. This is why a screen must be able to rebuild itself from an id plus saved UI state rather than from in-memory objects. Test restoration explicitly, because it is easy to miss until a device is low on memory.

## Code
```kotlin
class ArticleViewModel(
    private val repository: ArticleRepository,
    savedState: SavedStateHandle,
) : ViewModel() {
    private val articleId: String = checkNotNull(savedState["articleId"])
    val article = repository.observe(articleId)
}
```
