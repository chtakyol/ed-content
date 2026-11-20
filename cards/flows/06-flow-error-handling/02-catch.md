---
id: flows-catch
topic: flows/errors
title: catch
tags: [catch, fallback, exceptions]
related: [flows-exception-transparency, flows-catch-placement, flows-retry]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`catch` handles exceptions thrown by the upstream flow, and its lambda can emit fallback values so that the stream can finish normally. It does not catch exceptions thrown by the collector or by operators placed after it, and it does not catch `CancellationException`, because cancellation is not a failure. That makes `catch` a boundary around a source, not a general `try`/`catch` for the whole pipeline.

## Code
```kotlin
repository.updates()
    .catch { error ->
        log(error)
        emit(emptyList())       // fallback value
    }
    .collect { render(it) }
```
