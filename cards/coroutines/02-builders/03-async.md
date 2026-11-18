---
id: coroutines-async
topic: coroutines/builders
title: async
tags: [async, deferred, await]
related: [coroutines-builders-overview, coroutines-launch-vs-async, coroutines-builders-need-scope]
sources:
  - https://kotlinlang.org/docs/async-programming.html
---

## Explanation
`async` starts the coroutine immediately, like `launch`, but returns a `Deferred<T>` instead of a `Job`. A `Deferred` is a `Job` that also promises a value: `await()` suspends the caller until that value is available and then returns it. This makes `async` the tool for splitting one task into independent computations that run at the same time, with the caller collecting their results afterwards.

## Code
```kotlin
val a = async { fetchA() }
val b = async { fetchB() }
val result = a.await() + b.await()   // both ran concurrently
```
