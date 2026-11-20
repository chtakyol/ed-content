---
id: flows-what-is-flow
topic: flows/basics
title: What is a Flow?
tags: [flow, cold, stream]
related: [flows-cold-streams, flows-collecting-flows]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
A `Flow<T>` is a cold asynchronous stream: it describes a sequence of values produced over time, but it does no work until someone collects it. The producer is written with the `flow {}` builder and emits values with `emit`, while the consumer calls `collect` and receives each value as it arrives. Because production is suspending, a flow can wait for I/O between emissions without blocking a thread, and because it is cold, every collector gets its own independent run of the same description. A flow is therefore closer to a suspendable sequence than to a live channel.

## Code
```kotlin
val numbers = flow {
    emit(1)
    delay(100)
    emit(2)
}

numbers.collect { println(it) }   // 1, then 2
```
