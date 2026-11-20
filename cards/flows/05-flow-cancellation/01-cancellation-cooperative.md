---
id: flows-cancellation-cooperative
topic: flows/cancellation
title: Cancellation is cooperative
tags: [cancellation, cooperative, collect]
related: [flows-collecting-flows, flows-cancellable, flows-cleanup-finally]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
Collecting a flow runs inside a coroutine, so cancelling that coroutine cancels the whole collection: the upstream stops at its next suspension point and the flow is torn down. A producer that never suspends and never checks `isActive` will keep running despite cancellation, exactly like any other coroutine. This is cooperative cancellation, and it is the reason `emit` checks for cancellation and why tight loops inside a flow builder need an explicit `ensureActive()` or `yield()`.

## Code
```kotlin
val job = scope.launch {
    endlessFlow().collect { process(it) }
}
job.cancel()   // stops at the next suspension point
```
