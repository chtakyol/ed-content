---
id: activity-multi-window-and-focus
topic: activities/foundations
title: Multi-window and focus changes
tags: [activities, lifecycle, multi-window]
related: [activity-lifecycle-states, activity-configuration-changes]
sources:
  - https://developer.android.com/guide/components/activities/state-changes
---

## Explanation
In multi-window mode an activity can be visible without being resumed, and another app can take focus while your activity remains on screen. The system pauses the activity when it loses focus and may not call `onStop`, so work tied to `onResume`/`onPause` must tolerate a visible but inactive state. Use `onPause` to stop animations, camera previews, and input-sensitive work, and `onStart`/`onStop` for resources that should exist whenever the screen is visible. Do not assume that a paused activity is invisible or that a stopped one will never return.

## Code
```kotlin
override fun onPause() {
    super.onPause()
    videoView.pause()          // stop when focus is lost
}

override fun onStart() {
    super.onStart()
    location.start()           // visible, even if not focused
}
```
