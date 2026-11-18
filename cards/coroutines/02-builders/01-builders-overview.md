---
id: coroutines-builders-overview
topic: coroutines/builders
title: Builders at a glance
tags: [launch, async, runblocking, withcontext]
related: [coroutines-launch, coroutines-async, coroutines-runblocking, coroutines-withcontext, coroutines-builders-need-scope]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
  - https://kotlinlang.org/docs/async-programming.html
---

## Explanation
Four names cover nearly all coroutine code you will read. `launch` starts concurrent work and hands back a `Job`. `async` starts concurrent work that produces a value, handed back as `Deferred<T>` and read with `await()`. `runBlocking` bridges the blocking world into coroutines by blocking the calling thread until its body completes. `withContext` is the odd one out: it is a suspend function, not a builder, and moves the current coroutine onto a different context instead of starting a new one.

## Code
```kotlin
scope.launch { work() }                    // Job
val v = scope.async { compute() }.await()  // Deferred<T>
runBlocking { work() }                     // blocks the caller
withContext(Dispatchers.IO) { read() }     // same coroutine
```
