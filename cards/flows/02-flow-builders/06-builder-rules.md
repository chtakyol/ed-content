---
id: flows-builder-rules
topic: flows/builders
title: Rules of the flow builder
tags: [builder, context, transparency]
related: [flows-flow-builder, flows-flow-on, flows-exception-transparency, flows-channel-flow]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
A flow builder must be context-preserving: it may not emit from a different coroutine or from inside a `withContext` block, because that would break the guarantee that values arrive sequentially in the collector's context. The supported way to change where the upstream runs is `flowOn`, which does the context switch for you. Similarly, a flow must not catch exceptions thrown by its collector, since that would hide downstream failures from the operator that should handle them. When emissions really need to come from several coroutines, use `channelFlow` instead of working around these rules.

## Code
```kotlin
// wrong: emit from another context
flow { withContext(Dispatchers.IO) { emit(load()) } }

// right: move the whole upstream
flow { emit(load()) }.flowOn(Dispatchers.IO)
```
