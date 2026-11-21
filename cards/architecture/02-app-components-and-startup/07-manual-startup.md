---
id: architecture-manual-startup
topic: architecture/components
title: Manual vs automatic initialization
tags: [startup, initialization, performance]
related: [architecture-startup-initializers, architecture-startup-cost]
sources:
  - https://developer.android.com/topic/libraries/app-startup
---

## Explanation
App Startup can initialize everything automatically at process start, or you can disable automatic initialization and call `AppInitializer.getInstance(context).initializeComponent(...)` when a feature is first used. Automatic setup is simpler and fine for a small graph, while manual setup is faster when most sessions never touch the feature. Removing the library's own provider from the manifest is part of the manual setup, otherwise the library still initializes itself at startup.

## Code
```kotlin
val imageLoader = AppInitializer
    .getInstance(context)
    .initializeComponent(ImageLoaderInitializer::class.java)
```
