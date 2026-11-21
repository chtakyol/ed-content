---
id: architecture-startup-cost
topic: architecture/components
title: The cost of app startup
tags: [startup, performance, cold-start]
related: [architecture-manual-startup, architecture-startup-initializers]
sources:
  - https://developer.android.com/topic/libraries/app-startup
---

## Explanation
Startup is the time between the launcher tap and the first frame, and it is dominated by process creation, class loading, and any initialization that runs before the first screen is drawn. Work placed in `Application.onCreate` or in eager content providers is paid on every cold start, even if the user never opens the feature that needs it. Reducing startup means deferring non-critical initialization, removing unused initializers, and measuring with Macrobenchmark or startup tracing instead of guessing.

## Code
```kotlin
// Prefer on-demand initialization over work in Application.onCreate.
class App : Application() {
    val imageLoader by lazy {
        ImageLoader.Builder(this).build()
    }
}
```
