---
id: coroutines-limited-parallelism
topic: coroutines/context
title: limitedParallelism
tags: [dispatcher, concurrency-limit, io]
related: [coroutines-default-vs-io]
sources:
  - https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-i-o.html
---

## Explanation
`limitedParallelism(n)` returns a view of a dispatcher that runs at most `n` coroutines at the same time, while still using the original dispatcher's threads. It is a view and not a pool, so nothing is created or shut down, and the limit applies only to work dispatched through that view. The typical use is bounding blocking I/O, either to protect a downstream resource from a flood or to keep a few expensive calls from occupying the shared `IO` pool, which by default is generous.

## Code
```kotlin
val db = Dispatchers.IO.limitedParallelism(4)
withContext(db) { query() }   // at most 4 at a time
```
