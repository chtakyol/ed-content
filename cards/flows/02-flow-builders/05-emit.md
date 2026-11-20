---
id: flows-emit
topic: flows/builders
title: Emitting values
tags: [emit, backpressure, suspension]
related: [flows-flow-builder, flows-buffer, flows-builder-rules]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`emit` is a suspend function, not a fire-and-forget callback. If the collector is slow, `emit` suspends the producer until the value has been accepted, which is how a flow propagates backpressure without dropping or buffering anything by default. Emission is also sequential: the next value cannot be produced until the previous one has moved through the chain. Inserting `buffer` or `conflate` deliberately relaxes that coupling, but the default behavior is to wait.

## Code
```kotlin
flow {
    repeat(10) { emit(it) }   // each emit may suspend
}.collect { delay(100) }      // producer waits for this
```
