---
id: flows-buffer
topic: flows/context
title: buffer
tags: [buffer, throughput, backpressure]
related: [flows-emit, flows-conflate, flows-flow-on]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`buffer` inserts a queue between the upstream and the downstream, letting the producer run ahead while the collector is busy. It does not drop or merge values; it only decouples their timing, so the total work stays the same but the pipeline can overlap production and consumption. This is useful when the producer is bursty or the consumer is slow but every value still matters. The cost is memory for the queued values and a loss of strict hand-off between stages.

## Code
```kotlin
flow {
    repeat(100) { emit(it) }
}.buffer()                 // producer can run ahead
 .collect { delay(10) }
```
