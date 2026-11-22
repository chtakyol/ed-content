---
id: compose-debugging-phase-performance
topic: jetpack-compose/phases
title: Debugging phase performance
tags: [compose, phases, debugging]
related: [compose-recompose-relayout-redraw, compose-smart-recomposition]
sources:
  - https://developer.android.com/develop/ui/compose/phases
---

## Explanation
Start with the Layout Inspector's recomposition counts and the composition tracing tools to see which composables run and how often. If a composable recomposes constantly, check its inputs for unstable types and move state reads later. If layout is the cost, look for changing constraints, nested scrolling containers, or sizes that recalculate every frame. Measure release-like builds on a real device, because debug builds add overhead and can hide or exaggerate problems. Optimize the phase that is actually expensive rather than adding `remember` and `derivedStateOf` everywhere.

## Code
```text
1. Record a trace / inspect recomposition counts.
2. Identify the hot composable.
3. Check stability of its parameters.
4. Move reads into layout/draw lambdas where possible.
5. Re-measure before and after.
```
