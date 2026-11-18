---
id: coroutines-breaking-structure
topic: coroutines/structured-concurrency
title: Breaking the structure
tags: [globalscope, callbacks, leaks]
related: [coroutines-global-scope, coroutines-structured-guarantees]
sources:
  - https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html
---

## Explanation
Structure is lost the moment work is started somewhere that is not a child of the code that needs it: `GlobalScope`, a raw thread pool, a callback registered on some external object. Nothing then waits for that work, nothing cancels it when the screen closes, and its failures have no parent to report to. The symptoms are consistent: work continuing after its screen is gone, tests that pass alone and fail together, exceptions that never appear in logs. If a scope has to outlive a function, that is fine, but it still needs an owner that eventually cancels it.

## Code
```kotlin
GlobalScope.launch { poll() }   // nothing owns this
```
