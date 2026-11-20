---
id: flows-conflate
topic: flows/context
title: conflate
tags: [conflate, latest, backpressure]
related: [flows-buffer, flows-collect-latest]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`conflate` keeps only the most recent value when the collector cannot keep up, dropping intermediate values instead of queueing them. The producer is therefore never forced to wait for a slow collector beyond the single slot that holds the latest value. This is appropriate for state-like streams where only the newest value matters, such as a progress indicator or a sensor reading, and wrong when every value carries information that must not be lost.

## Code
```kotlin
sensor.readings()
    .conflate()
    .collect { value -> render(value) }   // skips stale values
```
