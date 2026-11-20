---
id: flows-cleanup-finally
topic: flows/cancellation
title: Cleanup with finally
tags: [finally, cleanup, cancellation]
related: [flows-cancellation-cooperative, flows-on-completion]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
A `finally` block in the flow builder runs when the flow completes normally and also when the collector cancels, which makes it the right place to close a resource or release a listener. The same idea applies at the collector through `onCompletion`, which runs after the upstream finishes, fails, or is cancelled. Cleanup code must not assume it can emit, because the downstream may already be gone; if it must suspend during cancellation, wrap that work in `withContext(NonCancellable)`.

## Code
```kotlin
fun lines(file: File): Flow<String> = flow {
    val reader = file.bufferedReader()
    try {
        var line = reader.readLine()
        while (line != null) {
            emit(line)
            line = reader.readLine()
        }
    } finally {
        reader.close()
    }
}
```
