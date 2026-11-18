---
id: coroutines-exception-propagation
topic: coroutines/exceptions
title: Exception propagation
tags: [exception, propagation, launch]
related: [coroutines-parent-child-jobs, coroutines-exception-handler]
sources:
  - https://kotlinlang.org/docs/exception-handling.html
---

## Explanation
An exception that escapes a coroutine is not thrown at the caller, because by then the caller has moved on. Instead it propagates up the `Job` tree: the coroutine's parent is cancelled, along with its siblings, and the exception keeps rising until it reaches a root coroutine. Only at that point, with no parent left to absorb it, is it handed to a `CoroutineExceptionHandler` or to the thread's default handler. `launch` and `async` differ in the middle of this path, which is why they are covered separately.

## Code
```kotlin
scope.launch {
    fail()          // cancels the parent, not this caller
}
```
