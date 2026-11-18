---
id: coroutines-exception-handler
topic: coroutines/exceptions
title: CoroutineExceptionHandler
tags: [exception, handler, root]
related: [coroutines-exception-propagation, coroutines-async-exceptions]
sources:
  - https://kotlinlang.org/docs/exception-handling.html
---

## Explanation
`CoroutineExceptionHandler` is a context element that receives exceptions which nothing else handled. It only runs for root coroutines, that is, those whose scope has no parent to report to, because a child always reports to its parent first and the parent's handler is the one that counts. Installing one inside a child's context has no effect. It also only sees exceptions from `launch`; `async` failures take a different route entirely.

## Code
```kotlin
val handler = CoroutineExceptionHandler { _, e -> log(e) }
scope.launch(handler) { fail() }   // root, so handled
```
