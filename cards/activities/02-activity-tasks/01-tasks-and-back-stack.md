---
id: activity-tasks-and-back-stack
topic: activities/tasks
title: Tasks and the back stack
tags: [activities, tasks, back-stack]
related: [activity-launch-modes, activity-handling-back]
sources:
  - https://developer.android.com/guide/components/activities/tasks-and-back-stack
---

## Explanation
A task is a collection of activities arranged in a back stack, with the current activity on top. Starting a new activity pushes it onto the stack, and pressing Back pops it and returns to the previous entry. Tasks can span apps when an activity is launched from another app, and the system groups them in the recents screen. The back stack is managed by the system, but you influence it with launch modes, intent flags, and `NavController` pop behavior. Keep the stack predictable so Back always moves to the place the user expects.

## Code
```text
Task
  ┌──────────────────┐
  │ ArticleActivity  │  ← top (visible)
  ├──────────────────┤
  │ ListActivity     │
  ├──────────────────┤
  │ MainActivity     │  ← bottom
  └──────────────────┘
```
