---
id: flows-cancellation-exception
topic: flows/cancellation
title: CancellationException in flows
tags: [cancellation, exception, transparency]
related: [flows-cancellation-cooperative, flows-catch]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
Cancellation is implemented with `CancellationException`, but it is not a failure and should not be handled like one. The `catch` operator does not catch cancellation, and a `try`/`catch` inside a flow builder should rethrow it rather than converting it into a normal emission. Swallowing a cancellation exception makes the flow keep working after its collector has gone, which leaks work and breaks structured concurrency. Catch specific operational exceptions, and let `CancellationException` propagate.

## Code
```kotlin
flow {
    try {
        emit(load())
    } catch (e: CancellationException) {
        throw e                 // never swallow
    } catch (e: IOException) {
        emit(cached())
    }
}
```
