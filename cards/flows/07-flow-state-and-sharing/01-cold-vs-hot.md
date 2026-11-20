---
id: flows-cold-vs-hot
topic: flows/state
title: Cold vs hot flows
tags: [cold, hot, sharedflow]
related: [flows-cold-streams, flows-shared-flow, flows-state-flow]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
A cold flow is a description that starts a new producer for every collector, so each collector has its own independent stream. A hot flow is already running: it has its own lifetime, emits whether or not anyone is listening, and shares the same emissions with all current collectors. `SharedFlow` and `StateFlow` are the hot types, while `flow {}` and its operators are cold until converted with `shareIn` or `stateIn`. The distinction matters because hot flows can lose values emitted before subscription and need an owner to cancel them.

## Code
```kotlin
val cold = flow { emit(load()) }          // runs per collector
val hot = MutableStateFlow(0)             // exists on its own
```
