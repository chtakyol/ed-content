---
id: coroutines-timeouts
topic: coroutines/cancellation
title: Timeouts
tags: [timeout, cancellation, withtimeout]
related: [coroutines-cancellation-exception]
sources:
  - https://kotlinlang.org/docs/cancellation-and-timeouts.html
---

## Explanation
`withTimeout` cancels its block if it has not finished within the given duration, and reports that by throwing `TimeoutCancellationException`, which is a `CancellationException`. Because it is a cancellation, the block stops at its next suspension point and its `finally` blocks still run, so a timeout cannot interrupt non-cooperative work either. `withTimeoutOrNull` returns `null` instead of throwing, which is convenient when a timed-out attempt is an expected outcome rather than an error.

## Code
```kotlin
val v = withTimeout(1_000) { load() }        // throws
val r = withTimeoutOrNull(1_000) { load() }  // null
```
