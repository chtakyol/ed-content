---
id: architecture-module-types
topic: architecture/modularization
title: Types of modules
tags: [modularization, feature, core]
related: [architecture-modularization, architecture-dependency-rules]
sources:
  - https://developer.android.com/topic/modularization
---

## Explanation
A typical modular app has an app module that wires everything together, feature modules that own a user-facing capability, core modules for shared infrastructure such as data, network, design system, and common utilities, and optionally domain modules for business rules. Feature modules depend on core modules and on each other only through explicit APIs. The app module depends on features and provides navigation and DI entry points. Naming modules by responsibility keeps the dependency graph readable.

## Code
```kotlin
// :feature:news  -> :core:data, :core:ui
// :core:data     -> :core:network, :core:database
// :app           -> all feature modules
```
