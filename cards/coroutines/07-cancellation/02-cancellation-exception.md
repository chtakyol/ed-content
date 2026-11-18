---
id: coroutines-cancellation-exception
topic: coroutines/cancellation
title: CancellationException
tags: [cancellation, exception, suspension]
related: [coroutines-cancellation-cooperative, coroutines-cancellation-not-error]
sources:
  - https://kotlinlang.org/docs/cancellation-and-timeouts.html
---

## Explanation
`CancellationException` is what a suspension point throws when its coroutine has been cancelled. It is control flow, not failure: it unwinds the coroutine, releases the thread, and marks the `Job` as cancelled, and it is deliberately not treated as an error by the machinery. That is why catching it to "handle the problem" is a bug, since it swallows the signal and lets a cancelled coroutine keep running. If a broad `catch (e: Exception)` is unavoidable, the cancellation exception has to be rethrown before anything else is done.

## Code
```kotlin
try {
    work()
} catch (e: CancellationException) {
    throw e             // never swallow this
}
```
