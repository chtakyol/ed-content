---
id: architecture-startup-ordering
topic: architecture/components
title: Startup dependency ordering
tags: [startup, dependencies, ordering]
related: [architecture-startup-initializers, architecture-manual-startup]
sources:
  - https://developer.android.com/topic/libraries/app-startup
---

## Explanation
Initializer dependencies define a partial order: App Startup creates a component only after the initializers it depends on have completed, and it topologically sorts the graph. This replaces brittle `Application.onCreate` sequences where one library silently assumed another had already run. Dependencies should be real rather than incidental, because listing an initializer that is not needed delays startup and couples unrelated libraries. Cycles are a configuration error and fail at startup.

## Code
```kotlin
class AnalyticsInitializer : Initializer<Analytics> {
    override fun create(context: Context): Analytics =
        Analytics.create(context)

    override fun dependencies() =
        listOf(ImageLoaderInitializer::class.java)
}
```
