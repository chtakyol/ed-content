---
id: coroutines-cleanup-finally
topic: coroutines/cancellation
title: Cleanup and NonCancellable
tags: [cancellation, finally, cleanup]
related: [coroutines-cancellation-exception]
sources:
  - https://kotlinlang.org/docs/cancellation-and-timeouts.html
---

## Explanation
A cancelled coroutine still runs its `finally` blocks, so that is where files, locks and connections get released. What does not work is suspending inside that cleanup: the coroutine is already cancelled, so the first suspend call throws `CancellationException` again and the cleanup is abandoned halfway. `withContext(NonCancellable)` suspends the cancellation for the duration of the block, which is the supported way to do suspending cleanup safely. Use it narrowly, only around the cleanup itself.

## Code
```kotlin
try {
    work()
} finally {
    withContext(NonCancellable) { close() }
}
```
