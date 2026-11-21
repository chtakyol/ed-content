---
id: oop-sealed-hierarchies
topic: oop/inheritance
title: Sealed hierarchies
tags: [oop, sealed, state]
related: [kotlin-sealed-classes, solid-sealed-vs-if-else]
sources:
  - https://kotlinlang.org/docs/sealed-classes.html
---

## Explanation
A sealed hierarchy is a closed family of types that the compiler can check exhaustively. It captures the useful part of inheritance, a shared contract, while making the set of variants explicit and finite. This is ideal for results, events, and UI states, where a new variant should force every consumer to decide how to handle it. Use a sealed interface when variants only need a contract, and a sealed class when they share state or helper behavior. Avoid putting Android framework types in the hierarchy; keep the states as plain data and render them at the edge.

## Code
```kotlin
sealed interface SyncState {
    data object Idle : SyncState
    data object Running : SyncState
    data class Failed(val message: String) : SyncState
}

fun label(state: SyncState) = when (state) {
    SyncState.Idle -> "Idle"
    SyncState.Running -> "Syncing"
    is SyncState.Failed -> "Failed: ${state.message}"
}
```
