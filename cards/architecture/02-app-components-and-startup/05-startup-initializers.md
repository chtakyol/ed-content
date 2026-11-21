---
id: architecture-startup-initializers
topic: architecture/components
title: Initializers in App Startup
tags: [startup, initializer, library]
related: [architecture-startup-ordering, architecture-startup-cost]
sources:
  - https://developer.android.com/topic/libraries/app-startup
---

## Explanation
The App Startup library provides a single content provider that runs registered `Initializer` components before `Application.onCreate`. Each initializer implements `create(context)` and can declare dependencies, so libraries can initialize themselves without adding their own providers. Centralizing initialization removes provider overhead and gives one place to order and trace startup work. The cost is that every registered initializer still runs at startup, so the list should stay minimal.

## Code
```kotlin
class ImageLoaderInitializer : Initializer<ImageLoader> {
    override fun create(context: Context): ImageLoader =
        ImageLoader.Builder(context).build()

    override fun dependencies(): List<Class<out Initializer<*>>> =
        emptyList()
}
```
