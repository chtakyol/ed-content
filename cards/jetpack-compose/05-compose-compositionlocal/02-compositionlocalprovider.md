---
id: compose-compositionlocalprovider
topic: jetpack-compose/compositionlocal
title: CompositionLocalProvider
tags: [compose, compositionlocal, provider]
related: [compose-compositionlocal, compose-when-to-use-compositionlocal]
sources:
  - https://developer.android.com/develop/ui/compose/compositionlocal
---

## Explanation
`CompositionLocalProvider` supplies values to a subtree of the composition. A provider can override an existing local, and nested providers shadow outer ones for their scope. `staticCompositionLocalOf` is for values that rarely change and recomposes the whole subtree when they do, while `compositionLocalOf` tracks reads and only invalidates the composables that read the value. Provide a sensible default or fail loudly with an error, so a missing provider is discovered immediately rather than producing a confusing fallback.

## Code
```kotlin
val LocalAnalytics = staticCompositionLocalOf<Analytics> {
    error("Analytics not provided")
}

@Composable
fun App(analytics: Analytics) {
    CompositionLocalProvider(LocalAnalytics provides analytics) {
        ArticleScreen()
    }
}
```
