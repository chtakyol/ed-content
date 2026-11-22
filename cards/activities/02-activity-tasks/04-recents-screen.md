---
id: activity-recents-screen
topic: activities/tasks
title: The recents screen
tags: [activities, recents, privacy]
related: [activity-secure-screens, activity-tasks-and-back-stack]
sources:
  - https://developer.android.com/guide/components/activities/recents
---

## Explanation
The recents screen shows tasks the user has recently used, with a snapshot of the top activity. The system owns this surface, but an app can influence it: `setRecentsScreenshotEnabled(false)` hides the snapshot for sensitive screens, and `FLAG_SECURE` prevents content from appearing in recents and screenshots. Recents also lets the user return to a task, so the app should restore its state cleanly. Do not rely on recents for persistence, and avoid putting sensitive data in the task label or icon.

## Code
```kotlin
// Hide the recents snapshot for a sensitive screen.
if (Build.VERSION.SDK_INT >= 33) {
    setRecentsScreenshotEnabled(false)
}
```
