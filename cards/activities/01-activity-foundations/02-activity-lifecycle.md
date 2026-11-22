---
id: activity-activity-lifecycle
topic: activities/foundations
title: Activity lifecycle
tags: [activities, lifecycle, callbacks]
related: [activity-lifecycle-states, architecture-lifecycle-basics]
sources:
  - https://developer.android.com/guide/components/activities/activity-lifecycle
---

## Explanation
The system moves an Activity through `onCreate`, `onStart`, `onResume`, `onPause`, `onStop`, `onDestroy`, and `onRestart` as its visibility and interactivity change. `onCreate` sets up the screen, `onStart` makes it visible, and `onResume` makes it interactive; the matching teardown callbacks release resources. The system may destroy and recreate an activity at any time, so state that must survive belongs in `ViewModel` or saved instance state, not in fields that assume the instance is permanent. Register listeners in the start/resume pair and unregister them in the corresponding stop/pause callback.

## Code
```kotlin
class ArticleActivity : ComponentActivity() {
    override fun onStart() {
        super.onStart()
        repository.startObserving()
    }

    override fun onStop() {
        repository.stopObserving()
        super.onStop()
    }
}
```
