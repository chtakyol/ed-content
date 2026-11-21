---
id: architecture-saved-instance-state
topic: architecture/lifecycle
title: Saved instance state
tags: [state, bundle, savedstate]
related: [architecture-config-change-vs-process-death, architecture-remember-saveable]
sources:
  - https://developer.android.com/topic/libraries/architecture/saving-states
---

## Explanation
Saved instance state is a `Bundle` the system keeps while an activity is stopped and restores if the process is recreated. It is meant for small amounts of transient UI state, such as a draft query or a scroll position, not for lists of data or bitmaps. The bundle is limited and serialized, so large objects slow down transitions and can trigger `TransactionTooLargeException`. Persist durable data in the data layer and keep only the minimum restoration keys here.

## Code
```kotlin
override fun onSaveInstanceState(outState: Bundle) {
    outState.putString("query", query)
    super.onSaveInstanceState(outState)
}
```
