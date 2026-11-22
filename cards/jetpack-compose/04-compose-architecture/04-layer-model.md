---
id: compose-layer-model
topic: jetpack-compose/architecture
title: Compose's layer model
tags: [compose, architecture, layers]
related: [compose-choosing-a-layer, compose-composable-functions]
sources:
  - https://developer.android.com/develop/ui/compose/layering
---

## Explanation
Compose is organized in layers: the runtime handles state, snapshots, and composition; the UI layer provides layout, drawing, and input; the foundation layer adds higher-level building blocks such as lazy lists and gestures; and Material adds a design system on top. Higher layers build on lower ones, so you can depend on the foundation without pulling in Material, or use the runtime without the UI. Understanding the layers helps you choose the smallest dependency that provides what you need and keeps a design system replaceable.

## Code
```text
Material / Material 3      design system components
        ▲
Foundation                  Row, LazyColumn, gestures
        ▲
UI                          layout, draw, input, Modifier
        ▲
Runtime                    state, snapshots, composition
```
