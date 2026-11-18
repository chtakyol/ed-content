---
id: coroutines-after-cancellation
topic: coroutines/cancellation
title: After cancellation
tags: [cancellation, terminal, join]
related: [coroutines-job-states, coroutines-cancellation-cooperative]
sources:
  - https://kotlinlang.org/docs/cancellation-and-timeouts.html
---

## Explanation
Cancellation is one way and final: once a coroutine's `Job` is cancelled it stays cancelled, and reviving it is not supported. Any further suspension inside that coroutine throws immediately, which means a cancelled coroutine cannot simply be resumed by calling it again, and `isCancelled` remains true for the life of the handle. To continue the same work, start a new coroutine in a scope that is still active. `cancelAndJoin()` combines the two calls you would otherwise always write together.

## Code
```kotlin
job.cancelAndJoin()
job.isCancelled     // true, permanently
```
