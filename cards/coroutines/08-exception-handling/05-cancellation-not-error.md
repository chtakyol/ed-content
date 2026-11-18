---
id: coroutines-cancellation-not-error
topic: coroutines/exceptions
title: Cancellation is not an error
tags: [cancellation, exception, logging]
related: [coroutines-cancellation-exception, coroutines-cancellation-cooperative]
sources:
  - https://kotlinlang.org/docs/exception-handling.html
---

## Explanation
`CancellationException` arrives through the same channel as real failures, which is why it so often gets logged as one. It is not: it means the coroutine was asked to stop, and treating it as a crash produces noise on every screen close and breaks the propagation that cancellation depends on. The rule is symmetrical to the one for ordinary errors: rethrow cancellation untouched, catch `Exception` only around code you can actually recover, and let the rest reach the parent.

## Code
```kotlin
} catch (e: CancellationException) {
    throw e                    // control flow, not failure
} catch (e: Exception) {
    log(e)                     // real failure
}
```
