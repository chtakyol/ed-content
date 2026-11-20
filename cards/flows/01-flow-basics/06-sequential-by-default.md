---
id: flows-sequential-by-default
topic: flows/basics
title: Flows are sequential by default
tags: [sequential, concurrency, operators]
related: [flows-collecting-flows, flows-flat-map, flows-buffer]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
The flow builder and all intermediate operators run one after another in the collector's coroutine, and each emitted value travels through the whole chain before the next one is produced. This is why a `map` or `filter` may safely touch mutable state without a lock: there is no concurrent execution inside a plain flow chain. Concurrency is opt-in and always explicit, through operators such as `buffer`, `flowOn`, `flatMapMerge`, or a channel-based builder. Without one of those, a flow is as sequential as a loop.

## Code
```kotlin
(1..3).asFlow()
    .map { it * 2 }      // runs to completion for each value
    .filter { it > 2 }
    .collect { println(it) }
```
