---
id: flows-timeouts
topic: flows/cancellation
title: Timeouts
tags: [timeout, withtimeout, cancellation]
related: [flows-cancellation-cooperative, flows-cleanup-finally]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`withTimeout` wraps the collection and cancels the whole flow if it has not completed in time, while `withTimeoutOrNull` does the same but returns `null` instead of throwing. Both cancel the upstream coroutine, so a stalled producer is interrupted at its next suspension point. If the timeout should apply to each element rather than the whole stream, put the timed operation inside `map` or `transform` instead of wrapping `collect`.

## Code
```kotlin
val result = withTimeoutOrNull(5_000) {
    flow.collect { handle(it) }
}

flow.map { withTimeout(1_000) { load(it) } }
```
