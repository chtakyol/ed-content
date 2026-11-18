---
id: coroutines-checking-cancellation
topic: coroutines/cancellation
title: Checking for cancellation
tags: [cancellation, isactive, yield]
related: [coroutines-cancellation-cooperative]
sources:
  - https://kotlinlang.org/docs/cancellation-and-timeouts.html
---

## Explanation
Suspension points check cancellation for you, but CPU-bound work has none, so it needs to check explicitly. `isActive` reports the state and lets you stop cleanly, while `ensureActive()` throws `CancellationException` on your behalf, which is usually what you want because it unwinds through the normal path. `yield()` is the third option: it checks and also gives other coroutines on the dispatcher a chance to run. The rule of thumb is that any loop lasting more than a few milliseconds belongs next to one of these.

## Code
```kotlin
while (i < n && isActive) {
    step(i++)           // stop early, no exception
}
```
