---
id: activity-lifecycle-states
topic: activities/foundations
title: Lifecycle states
tags: [activities, lifecycle, states]
related: [activity-activity-lifecycle, activity-multi-window-and-focus]
sources:
  - https://developer.android.com/guide/components/activities/activity-lifecycle
---

## Explanation
An Activity is created, started, resumed, paused, stopped, and destroyed, and each state has a different guarantee. A created activity has been instantiated, a started one is visible, and a resumed one is in the foreground and interactive. A paused activity is still partially visible but may not receive input, while a stopped one is not visible and can be killed under memory pressure. Code that must run whenever the screen is visible belongs between `onStart` and `onStop`; code that should stop when the user leaves belongs between `onResume` and `onPause`.

## Code
```text
onCreate ─▶ onStart ─▶ onResume
                ▲          │
                │          ▼
             onRestart   onPause
                ▲          │
                └─ onStop ◀┘
                     │
                     ▼
                 onDestroy
```
