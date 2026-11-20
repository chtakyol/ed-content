---
id: flows-flow-on
topic: flows/context
title: flowOn
tags: [flowon, dispatcher, context]
related: [flows-flow-builder, flows-context-preservation, flows-buffer]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`flowOn` changes the context in which the upstream part of a flow runs: the builder and every operator before the call, but not the operators or collector after it. That makes it the supported way to move blocking work onto `Dispatchers.IO` while keeping the collector on its own dispatcher, such as `Main`. It does not run the stages in parallel; it moves them to another context and inserts the buffering needed to hand values across the boundary.

## Code
```kotlin
repository.updates()
    .map { readFromDisk(it) }     // runs on IO
    .flowOn(Dispatchers.IO)
    .collect { render(it) }       // stays on the caller's context
```
