---
id: coroutines-default-vs-io
topic: coroutines/context
title: Default vs IO
tags: [dispatcher, cpu, blocking-io]
related: [coroutines-dispatchers, coroutines-limited-parallelism]
sources:
  - https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html
  - https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/-i-o.html
---

## Explanation
`Dispatchers.Default` is sized to the number of CPU cores, so it is the right pool for computation and the wrong place to block. `Dispatchers.IO` exists for blocking calls such as file and network work that have no suspending alternative, and it is elastic: it starts extra threads when its own are all parked in blocking calls, sharing threads with `Default` where it can. Blocking on `Default` starves the pool, while ignoring `IO` and blocking everywhere defeats the point of suspending.

## Code
```kotlin
withContext(Dispatchers.Default) { parse(data) }   // CPU-bound
withContext(Dispatchers.IO) { file.readText() }    // blocking
```
