---
id: activity-launch-modes
topic: activities/tasks
title: Launch modes
tags: [activities, tasks, launch-modes]
related: [activity-tasks-and-back-stack, activity-handling-back]
sources:
  - https://developer.android.com/guide/components/activities/tasks-and-back-stack
---

## Explanation
Launch modes decide how a new activity instance relates to the existing task. `standard` creates a new instance every time, `singleTop` reuses the instance if it is already on top, `singleTask` reuses an existing instance and clears everything above it, and `singleInstance` puts the activity in a task of its own. Launch modes can be declared in the manifest or requested with intent flags, but they are easy to misuse. Prefer a single-activity architecture with navigation for new apps, and use launch modes only for specific system integrations such as a share target or a launcher entry.

## Code
```xml
<activity
    android:name=".ShareActivity"
    android:launchMode="singleTop"
    android:exported="true" />
```
