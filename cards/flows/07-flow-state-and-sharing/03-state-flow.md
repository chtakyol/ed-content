---
id: flows-state-flow
topic: flows/state
title: StateFlow
tags: [stateflow, state, hot]
related: [flows-shared-flow, flows-state-flow-vs-shared-flow]
sources:
  - https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-state-flow/
---

## Explanation
`StateFlow` is a hot flow that always has a current value. A new collector immediately receives that value and then every subsequent change, and the latest value is available synchronously through `.value`. It is conflated and only emits when the value actually changes, so a slow collector can miss intermediate updates but never sees a stale final state. `MutableStateFlow(initial)` is the writable version, and it is the usual replacement for a `LiveData` holding UI state.

## Code
```kotlin
val state = MutableStateFlow(UiState.Loading)

state.value = UiState.Ready(data)
state.collect { render(it) }   // gets current value first
```
