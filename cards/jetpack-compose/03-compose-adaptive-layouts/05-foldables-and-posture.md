---
id: compose-foldables-and-posture
topic: jetpack-compose/adaptive-layouts
title: Foldables and posture
tags: [compose, adaptive, foldables]
related: [compose-window-size-classes, compose-responsive-layouts]
sources:
  - https://developer.android.com/develop/ui/compose/build-adaptive-apps
---

## Explanation
A foldable can present a continuous screen, a hinge-separated pair of panes, or a tabletop posture where one half stands up. Window size classes tell you how much space you have; `WindowLayoutInfo` and `FoldingFeature` tell you about the physical fold and its state. Use the fold information to keep important content out of the hinge and to choose between a single pane and a two-pane layout. Do not hard-code device names or hinge sizes; react to the reported features and fall back gracefully on ordinary phones.

## Code
```kotlin
val context = LocalContext.current
val windowInfoTracker = WindowInfoTracker.getOrCreate(context)

val layoutInfo by windowInfoTracker
    .windowLayoutInfo(context)
    .collectAsStateWithLifecycle(initialValue = WindowLayoutInfo(emptyList()))

val foldingFeature = layoutInfo.displayFeatures
    .filterIsInstance<FoldingFeature>()
    .firstOrNull()

val isTabletop = foldingFeature?.state == FoldingFeature.State.HALF_OPENED
```
