---
id: compose-deferring-reads
topic: jetpack-compose/phases
title: Deferring reads
tags: [compose, phases, performance]
related: [compose-state-reads-per-phase, compose-derived-state-of]
sources:
  - https://developer.android.com/develop/ui/compose/phases
---

## Explanation
Deferring a read means moving it into a lambda that runs in a later phase, so frequent changes do not invalidate composition. Compose provides lambda-based modifiers such as `offset { }`, `graphicsLayer { }`, `alpha { }`, and `drawBehind { }` for exactly this purpose. This is especially valuable for animation, scrolling, and gesture values that change every frame. Use it when the value only affects layout or drawing; if the composable needs the value to decide which children to emit, the read must stay in composition.

## Code
```kotlin
val scrollState = rememberScrollState()

// Read in draw, not composition.
Box(
    Modifier
        .fillMaxWidth()
        .graphicsLayer { translationY = -scrollState.value / 2f }
)
```
