---
id: flows-context-preservation
topic: flows/context
title: Context preservation
tags: [context, invariant, flowon]
related: [flows-flow-on, flows-builder-rules]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
A flow guarantees that its emissions are sequential and context-preserving, so the builder may not emit from a coroutine running in a different context. Wrapping `emit` in `withContext` violates that guarantee and fails at runtime, because the collector would no longer be able to apply backpressure correctly. `flowOn` exists precisely to relocate the upstream while keeping the invariant intact, and `channelFlow` covers the cases where values genuinely must be produced from several coroutines.

## Code
```kotlin
// throws: emission from a different context
flow { withContext(Dispatchers.IO) { emit(1) } }

// correct: relocate the whole upstream
flow { emit(1) }.flowOn(Dispatchers.IO)
```
