---
id: flows-buffer-sizes
topic: flows/context
title: Buffer sizes
tags: [buffer, capacity, rendezvous]
related: [flows-buffer, flows-conflate]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`buffer(capacity)` controls how many values may wait between producer and collector. `BUFFERED` is the default and holds 64 values, `RENDEZVOUS` is zero and forces a hand-off for every value, `CONFLATED` keeps only the latest, and `UNLIMITED` never makes the producer wait. Choosing a capacity is a trade between throughput, memory, and freshness: larger buffers absorb bursts but delay the collector and can hide a producer that is simply too fast.

## Code
```kotlin
flow.buffer(0)                       // no queue, strict hand-off
flow.buffer(Channel.BUFFERED)        // default 64
flow.buffer(Channel.UNLIMITED)
flow.buffer(Channel.CONFLATED)
```
