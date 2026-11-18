---
id: coroutines-coroutine-start
topic: coroutines/builders
title: CoroutineStart modes
tags: [coroutinestart, lazy, scheduling]
related: [coroutines-launch, coroutines-async]
sources:
  - https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html
---

## Explanation
Every builder takes a `start` parameter that controls when the coroutine's body may begin. `DEFAULT` dispatches it immediately, `LAZY` holds it until `start()` or the first `join()`/`await()`, `ATOMIC` is like `DEFAULT` but cannot be cancelled before it begins, and `UNDISPATCHED` runs the body inline on the current thread until its first suspension. `LAZY` is the one you will actually reach for, mostly to set up a coroutine whose dependencies are not ready yet.

## Code
```kotlin
val job = scope.launch(start = CoroutineStart.LAZY) { work() }
job.start()     // nothing ran until here
```
