---
id: flows-flow-builder
topic: flows/builders
title: The flow builder
tags: [builder, emit, cold]
related: [flows-what-is-flow, flows-emit, flows-builder-rules]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`flow {}` is the general-purpose builder: its block is a suspend function with a `FlowCollector` receiver, so it can call `emit` as well as any other suspend function. The block runs anew for every collector and runs in the collector's coroutine unless `flowOn` moves it elsewhere. Values are produced one at a time, and `emit` suspends while the downstream is busy, which is how a flow applies backpressure without an explicit protocol.

## Code
```kotlin
fun ticker(): Flow<Int> = flow {
    var i = 0
    while (true) {
        emit(i++)
        delay(1_000)
    }
}
```
