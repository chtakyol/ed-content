---
id: compose-state-reads-per-phase
topic: jetpack-compose/phases
title: State reads in each phase
tags: [compose, phases, state]
related: [compose-three-phases, compose-deferring-reads]
sources:
  - https://developer.android.com/develop/ui/compose/phases
---

## Explanation
Where you read state determines which phase is invalidated. Reading a state value in the composable body records the read in composition, so a change recomposes that scope. Reading it inside a layout lambda or a `Modifier.offset { }` records it in layout, so a change only re-measures and re-places. Reading it inside a draw lambda records it in draw, so a change only repaints. The same value can therefore be cheap or expensive depending on where it is read, which is why animated offsets and colors are often deferred.

## Code
```kotlin
// Read in composition: every change recomposes.
Box(Modifier.offset(x = offsetX.dp))

// Read in layout: only re-measures and re-places.
Box(Modifier.offset { IntOffset(offsetX.roundToInt(), 0) })
```
