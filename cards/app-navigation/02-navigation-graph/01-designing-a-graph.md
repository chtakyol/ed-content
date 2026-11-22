---
id: navigation-designing-a-graph
topic: app-navigation/graph
title: Designing a navigation graph
tags: [navigation, graph, design]
related: [navigation-nested-graphs, navigation-type-safe-navigation]
sources:
  - https://developer.android.com/guide/navigation/design
---

## Explanation
A navigation graph is a map of destinations and the paths between them. Start from the user flows rather than the screen list: identify the entry points, the main path, the alternate paths, and where Back should lead. Give each destination one clear responsibility, avoid cycles that trap the user, and group related screens into nested graphs when they form a flow. The graph should be readable enough that a new team member can trace a user journey without opening every composable.

## Code
```text
Root graph
├─ articles (start)
│   └─ article/{id}
│       └─ comments/{id}
├─ search
└─ settings
    └─ about
```
