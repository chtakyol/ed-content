---
id: activity-saving-instance-state
topic: activities/state
title: Saving instance state
tags: [activities, saved-state, bundle]
related: [activity-configuration-changes, architecture-saved-instance-state]
sources:
  - https://developer.android.com/guide/components/activities/state-changes
---

## Explanation
Override `onSaveInstanceState` to write small UI state into the bundle the system keeps while the activity is stopped. The same bundle is passed back to `onCreate` and `onRestoreInstanceState` after a configuration change or process recreation. Store values that the user would notice missing, such as a draft text, a selected tab, or a scroll position, and rebuild everything else from a stable id. Do not store large objects, bitmaps, or data that belongs in a database; the saved state is meant for a small amount of transient UI state.

## Code
```kotlin
override fun onSaveInstanceState(outState: Bundle) {
    super.onSaveInstanceState(outState)
    outState.putString("query", binding.search.text.toString())
}

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    val query = savedInstanceState?.getString("query").orEmpty()
    binding.search.setText(query)
}
```
