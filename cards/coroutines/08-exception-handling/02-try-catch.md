---
id: coroutines-try-catch
topic: coroutines/exceptions
title: try/catch inside coroutines
tags: [try-catch, exception, children]
related: [coroutines-coroutinescope-vs-supervisorscope, coroutines-exception-propagation]
sources:
  - https://kotlinlang.org/docs/exception-handling.html
---

## Explanation
A `try`/`catch` works normally around suspend calls in the same coroutine, so wrapping a suspending call is enough to handle its failure. It does not work around `launch`: that call only starts a coroutine and returns, so the child's exception surfaces long after the `try` block has been left, on the parent's path. To make a child's failure catchable, put the `try` outside a `coroutineScope` that contains it, or isolate it with `supervisorScope` and catch inside the child.

## Code
```kotlin
try {
    launch { fail() }       // never caught here
} catch (e: Exception) { }
```
