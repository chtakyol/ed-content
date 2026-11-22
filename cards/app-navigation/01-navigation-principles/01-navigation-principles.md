---
id: navigation-principles
topic: app-navigation/principles
title: Navigation principles
tags: [navigation, principles, ux]
related: [navigation-component, activity-tasks-and-back-stack]
sources:
  - https://developer.android.com/guide/navigation/principles
---

## Explanation
Good navigation has a fixed start destination, a clear back stack, and a predictable path to every screen. The user should always understand where they are, how they got there, and how to get back, and the system Back gesture should match that model. Deep links and state restoration are part of the design, not afterthoughts, because users can enter a flow from a notification or return after process death. Keep destinations focused, avoid duplicate paths to the same state, and let the navigation graph express the structure rather than scattering `startActivity` calls through the UI.

## Code
```text
start destination
      │
      ▼
  ArticleList ──▶ ArticleDetail ──▶ Comments
      ▲                 │
      └──── back ───────┘
```
