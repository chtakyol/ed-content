---
id: compose-vs-views
topic: jetpack-compose/mental-model
title: Compose vs the View system
tags: [compose, views, interop]
related: [compose-declarative-ui, compose-composition]
sources:
  - https://developer.android.com/develop/ui/compose/mental-model
---

## Explanation
The View system builds a mutable hierarchy of widgets and updates them imperatively, while Compose builds an immutable description that is re-created when state changes. Views rely on XML, view binding, and lifecycle-aware observation; Compose relies on Kotlin functions, state reads, and recomposition. Compose can host Views with `AndroidView` and Views can host Compose with `ComposeView`, so migration can be incremental. Choose Compose for new UI, and keep interop at the edges rather than mixing both models inside the same screen without a clear boundary.

## Code
```kotlin
@Composable
fun LegacyChart(data: List<Float>) {
    AndroidView(
        factory = { context -> ChartView(context) },
        update = { view -> view.setData(data) },
    )
}
```
