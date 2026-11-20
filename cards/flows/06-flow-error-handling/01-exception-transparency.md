---
id: flows-exception-transparency
topic: flows/errors
title: Exception transparency
tags: [exceptions, transparency, catch]
related: [flows-builder-rules, flows-catch, flows-catch-placement]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
Exception transparency means a flow builder must not catch exceptions that belong to its collector. If a `flow {}` block wraps `emit` in a broad `try`/`catch`, it can swallow a failure thrown downstream, leaving the collector broken but the producer unaware. The `catch` operator exists to separate the two directions: it handles failures from the upstream and leaves failures from the downstream alone. Keep `try`/`catch` in a builder narrow, around the producer's own work, and rethrow anything else.

## Code
```kotlin
// wrong: may swallow a collector failure
flow {
    try { emit(load()) } catch (e: Exception) { emit(fallback()) }
}

// right: handle only upstream failures
flow { emit(load()) }.catch { emit(fallback()) }
```
