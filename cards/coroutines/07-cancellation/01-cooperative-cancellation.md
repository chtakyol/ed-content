---
id: coroutines-cancellation-cooperative
topic: coroutines/cancellation
title: Cancellation is cooperative
tags: [cancellation, cooperative, job]
related: [coroutines-job, coroutines-cancellation-exception, coroutines-checking-cancellation]
sources:
  - https://kotlinlang.org/docs/cancellation-and-timeouts.html
---

## Explanation
`cancel()` does not stop a coroutine, it only marks its `Job` as cancelling and returns immediately. The coroutine stops when it next cooperates: by reaching a suspension point, which throws `CancellationException`, or by checking `isActive` on its own. Code that never suspends and never checks will run to completion no matter how early it was cancelled, which is why a tight computation loop needs an explicit check. This is cooperative cancellation, and it is the only kind coroutines have.

## Code
```kotlin
job.cancel()        // marks it, returns at once
job.join()          // suspends until it really stops
```
