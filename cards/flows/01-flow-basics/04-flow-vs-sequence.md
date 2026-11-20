---
id: flows-flow-vs-sequence
topic: flows/basics
title: Flow vs sequence
tags: [sequence, laziness, comparison]
related: [flows-flow-vs-suspend-function, flows-what-is-flow]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
A `Sequence` is lazy and sequential, just like a flow, but its operations are blocking: it cannot wait for a network call or a database query between elements. A flow is also sequential by default, yet every step may suspend, so it composes naturally with coroutines and asynchronous work. The practical rule is to use a sequence for purely CPU-bound transformations of an in-memory collection, and a flow when production or consumption needs to wait, stream, or be cancelled.

## Code
```kotlin
listOf(1, 2, 3).asSequence().map { it * 2 }   // synchronous
listOf(1, 2, 3).asFlow().map { it * 2 }       // suspendable
```
