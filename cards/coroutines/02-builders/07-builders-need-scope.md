---
id: coroutines-builders-need-scope
topic: coroutines/builders
title: Builders need a scope
tags: [scope, structure, lifetime]
related: [coroutines-what-is-coroutine]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
`launch`, `async` and the rest are extension functions on `CoroutineScope`, so there is no way to start a coroutine without one. The receiving scope supplies the coroutine's context, including its dispatcher and its `Job`, and it owns the coroutine's lifetime: the new coroutine becomes a child of the scope, and the scope decides when it is cancelled. That ownership is what makes structured concurrency possible, and it is why choosing the right scope matters more than choosing the right builder.

## Code
```kotlin
val job = scope.launch { work() }  // child of this scope
scope.cancel()                     // takes the child with it
```
