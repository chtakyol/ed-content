---
id: compose-compositionlocal
topic: jetpack-compose/compositionlocal
title: CompositionLocal
tags: [compose, compositionlocal, scoping]
related: [compose-compositionlocalprovider, compose-when-to-use-compositionlocal]
sources:
  - https://developer.android.com/develop/ui/compose/compositionlocal
---

## Explanation
A `CompositionLocal` is a named value that composables can read without receiving it as a parameter. It creates an implicit dependency scoped to the composition, which is useful for values that nearly every composable needs, such as the current theme, locale, or density. Reads are tracked like state, so changing the provided value recomposes only the composables that read it. Because the dependency is implicit, CompositionLocal makes code harder to trace, so reserve it for cross-cutting values rather than ordinary screen state or dependencies.

## Code
```kotlin
val LocalAnalytics = staticCompositionLocalOf<Analytics> {
    error("Analytics not provided")
}

@Composable
fun TrackButton(label: String) {
    val analytics = LocalAnalytics.current
    Button(onClick = { analytics.track(label) }) { Text(label) }
}
```
