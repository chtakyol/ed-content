---
id: coroutines-launch
topic: coroutines/builders
title: launch
tags: [launch, job, fire-and-forget]
related: [coroutines-builders-overview, coroutines-launch-vs-async, coroutines-builders-need-scope]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
`launch` starts a new coroutine and returns immediately with a `Job` that represents it. The calling code does not wait and receives no result, so `launch` is meant for work whose outcome nobody consumes: a side effect, a background sync, a log write. An uncaught exception inside it is not returned to the caller either, it propagates to the parent scope. That is exactly why `launch` is described as fire-and-forget, and why it should not carry a value someone else needs.

## Code
```kotlin
val job = scope.launch {
    syncPending()          // runs concurrently
}
job.join()                 // suspends until done
```
