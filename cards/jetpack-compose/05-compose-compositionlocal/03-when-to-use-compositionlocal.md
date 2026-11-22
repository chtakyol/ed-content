---
id: compose-when-to-use-compositionlocal
topic: jetpack-compose/compositionlocal
title: When to use CompositionLocal
tags: [compose, compositionlocal, design]
related: [compose-compositionlocal, compose-architecture-overview]
sources:
  - https://developer.android.com/develop/ui/compose/compositionlocal
---

## Explanation
Use CompositionLocal for ambient, cross-cutting values that would otherwise have to be threaded through many layers: theme colors and typography, locale and layout direction, density, or an analytics facade. Do not use it as a service locator for repositories, ViewModels, or feature state, because an implicit dependency hides what a composable actually needs and makes tests and previews harder to set up. If a value is used by only a few composables or changes frequently, pass it explicitly. A useful test is whether the value is part of the environment rather than part of the screen's data.

## Code
```kotlin
// Good: environment value.
val LocalSpacing = compositionLocalOf { Spacing.default }

// Bad: screen dependency hidden in the composition.
val LocalArticleRepository = staticCompositionLocalOf<ArticleRepository> {
    error("not provided")
}
```
