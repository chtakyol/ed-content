---
id: coroutines-async-exceptions
topic: coroutines/exceptions
title: async and exceptions
tags: [async, deferred, exception]
related: [coroutines-async, coroutines-coroutinescope-vs-supervisorscope]
sources:
  - https://kotlinlang.org/docs/async-programming.html
---

## Explanation
`async` does not pass its failure to a handler, it stores it inside the `Deferred` and rethrows it at `await()`. The exception is therefore the awaiter's problem, and if nobody ever awaits, nobody ever sees the failure, even though the coroutine did fail. Awaiting is not optional bookkeeping: it is how the failure is delivered. When several `async` calls run side by side and only some are needed, isolate them with `supervisorScope` so a discarded failure cannot cancel the work you do care about.

## Code
```kotlin
val d = scope.async { fail() }
runCatching { d.await() }   // failure surfaces here
```
