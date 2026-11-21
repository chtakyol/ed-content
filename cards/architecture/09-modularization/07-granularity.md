---
id: architecture-granularity
topic: architecture/modularization
title: Choosing module granularity
tags: [modularization, granularity, build]
related: [architecture-modularization, architecture-module-types]
sources:
  - https://developer.android.com/topic/modularization
---

## Explanation
Module granularity is a trade-off between isolation and overhead. Too coarse and boundaries are not enforced, builds stay slow, and ownership is unclear; too fine and the build graph, configuration, and API surface become expensive to maintain. A good starting point is one module per feature plus a few core modules, split further only when a real need appears, such as parallel team ownership, a slow module, or a reusable component. Measure build times before and after a split rather than guessing.

## Code
```kotlin
// Start here:
// :app, :feature:*, :core:data, :core:ui

// Split further only when justified:
// :feature:news:api + :feature:news:impl
```
