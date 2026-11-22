---
id: navigation-activity-destinations
topic: app-navigation/graph
title: Activity destinations
tags: [navigation, activities, destinations]
related: [navigation-nested-graphs, activity-what-is-an-activity]
sources:
  - https://developer.android.com/guide/navigation/design/activity-destinations
---

## Explanation
An activity destination lets a navigation graph launch a separate Activity, which is useful at the boundary with another app or a legacy screen that has not moved into the graph. The destination is declared in the graph and can use transitions like any other destination. Prefer composable destinations inside a single activity for normal app flow, because activity destinations create a separate task/back-stack boundary and duplicate state handling. Use them for external handoffs, not as a substitute for in-app screens.

## Code
```xml
<!-- res/navigation/main_graph.xml -->
<activity
    android:id="@+id/legacy"
    android:name=".LegacyActivity"
    android:label="Legacy" />
```
