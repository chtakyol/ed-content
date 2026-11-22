---
id: compose-window-size-classes
topic: jetpack-compose/adaptive-layouts
title: Window size classes
tags: [compose, adaptive, window-size]
related: [compose-adaptive-apps, compose-responsive-layouts]
sources:
  - https://developer.android.com/develop/ui/compose/build-adaptive-apps
---

## Explanation
Window size classes group the available width and height into compact, medium, and expanded buckets. They are a design vocabulary for layout decisions, not a device category: the same tablet in split-screen can be compact, and a resized desktop window moves between classes. In Compose, `calculateWindowSizeClass()` reads the current window metrics, and you branch on `widthSizeClass` or `heightSizeClass`. Use the classes to choose layouts and navigation patterns, and keep the breakpoints consistent across the app rather than inventing local thresholds.

## Code
```kotlin
val windowSizeClass = calculateWindowSizeClass(activity)

when (windowSizeClass.widthSizeClass) {
    WindowWidthSizeClass.Compact -> BottomNavigation()
    WindowWidthSizeClass.Medium,
    WindowWidthSizeClass.Expanded -> NavigationRail()
}
```
