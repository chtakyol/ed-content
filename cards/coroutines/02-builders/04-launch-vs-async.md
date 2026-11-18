---
id: coroutines-launch-vs-async
topic: coroutines/builders
title: launch vs async
tags: [launch, async, deferred, job]
related: [coroutines-launch, coroutines-async]
sources:
  - https://kotlinlang.org/docs/async-programming.html
---

## Explanation
The choice comes down to one question: does the caller need a value? If yes, use `async` and `await()` the result; if the work only produces a side effect, use `launch` and keep the `Job` for lifetime management. `async` is not a better `launch`, and using it for fire-and-forget work means the `Deferred` is discarded, so its result is lost and nothing observes it. Conversely, `launch` cannot return a value at all, which is why fetching two things in parallel and combining them needs `async`.

## Code
```kotlin
scope.launch { markSeen() }          // no value wanted
val name = scope.async { loadName() }.await()  // value wanted
```
