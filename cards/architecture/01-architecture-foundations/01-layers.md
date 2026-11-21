---
id: architecture-layers
topic: architecture/foundations
title: The three layers of an app
tags: [architecture, layers, separation]
related: [architecture-layer-dependencies, architecture-single-source-of-truth]
sources:
  - https://developer.android.com/topic/architecture
---

## Explanation
A well-structured Android app is divided into a UI layer, an optional domain layer, and a data layer. The UI layer renders state and turns user input into actions, the domain layer holds reusable business rules, and the data layer owns application data and exposes it through repositories. Each layer only knows about the layers below it, so the UI never talks to a database and the data layer never references a composable. This separation keeps screens replaceable and makes business logic testable without Android.

## Code
```kotlin
// Package boundaries follow the layers.
// ui/       composables, ViewModels
// domain/   use cases
// data/     repositories, data sources
```
