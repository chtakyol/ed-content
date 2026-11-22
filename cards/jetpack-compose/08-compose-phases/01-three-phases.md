---
id: compose-three-phases
topic: jetpack-compose/phases
title: The three phases
tags: [compose, phases, performance]
related: [compose-state-reads-per-phase, compose-recompose-relayout-redraw]
sources:
  - https://developer.android.com/develop/ui/compose/phases
---

## Explanation
Compose renders a frame in three phases: composition, layout, and draw. Composition runs composables and builds the tree, layout measures and places nodes, and draw paints them. Each phase can be skipped if its inputs did not change, which is why reading state in the right phase matters. A state read during composition invalidates composition, a read during layout invalidates layout, and a read during draw invalidates only draw. Keeping reads as late as possible is the core performance technique in Compose.

## Code
```text
State change
   │
   ▼
Composition  ── builds/updates the UI tree
   │
   ▼
Layout       ── measures and places
   │
   ▼
Draw         ── paints pixels
```
