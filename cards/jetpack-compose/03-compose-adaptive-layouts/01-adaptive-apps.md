---
id: compose-adaptive-apps
topic: jetpack-compose/adaptive-layouts
title: Adaptive apps
tags: [compose, adaptive, layouts]
related: [compose-window-size-classes, compose-responsive-layouts]
sources:
  - https://developer.android.com/develop/ui/compose/build-adaptive-apps
---

## Explanation
An adaptive app adjusts its layout to the available window rather than assuming a single phone shape. The same screen may need a bottom bar on a phone, a navigation rail on a tablet, and a list-detail layout on a foldable or desktop window. Compose supports this with window size classes, constraint-aware layouts, and adaptive scaffolds, so the UI can respond without separate codebases. Start from content priorities and decide which panes can appear side by side as space grows, instead of scaling a phone layout up.

## Code
```kotlin
@Composable
fun App(windowSizeClass: WindowSizeClass) {
    when (windowSizeClass.widthSizeClass) {
        WindowWidthSizeClass.Compact -> PhoneApp()
        WindowWidthSizeClass.Medium -> TabletApp()
        else -> DesktopApp()
    }
}
```
