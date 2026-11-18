---
id: coroutines-job-vs-deferred
topic: coroutines/jobs
title: Job vs Deferred
tags: [job, deferred, async]
related: [coroutines-launch, coroutines-async]
sources:
  - https://kotlinlang.org/docs/async-programming.html
---

## Explanation
`Deferred<T>` is a `Job` that also carries a value, so everything said about jobs, joining and cancelling applies to it unchanged. The single addition is `await()`, which suspends until the value exists and returns it, or rethrows the failure that prevented it. This is why `launch` handing back a `Job` and `async` handing back a `Deferred` is not a coincidence: both are handles to lifetime, and only one of them has a result slot.

## Code
```kotlin
val job: Job = scope.launch { }
val deferred: Deferred<Int> = scope.async { 1 }
val value = deferred.await()
```
