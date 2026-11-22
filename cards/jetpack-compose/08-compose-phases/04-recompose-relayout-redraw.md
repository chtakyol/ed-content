---
id: compose-recompose-relayout-redraw
topic: jetpack-compose/phases
title: Recomposition, relayout, and redraw
tags: [compose, phases, performance]
related: [compose-three-phases, compose-smart-recomposition]
sources:
  - https://developer.android.com/develop/ui/compose/phases
---

## Explanation
Recomposition re-runs composables and updates the tree, relayout re-measures and re-places nodes, and redraw repaints them. A state change can trigger any subset of these phases depending on where the state is read and what it affects. Changing text usually requires recomposition plus layout and draw; changing only a color read in draw can skip composition and layout. Understanding the difference helps you diagnose jank: too much recomposition points at unstable inputs or early reads, while too much layout points at changing sizes or constraints.

## Code
```kotlin
// Recompose + layout + draw: size depends on state in composition.
Box(Modifier.size(if (expanded) 200.dp else 100.dp))

// Draw only: color read in the draw phase.
Box(Modifier.drawBehind { drawRect(color = colorState.value) })
```
