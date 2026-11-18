---
id: coroutines-context-inheritance
topic: coroutines/context
title: Context inheritance
tags: [context, inheritance, job]
related: [coroutines-coroutine-context]
sources:
  - https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html
---

## Explanation
A new coroutine inherits its parent's context and may override individual elements by passing them to the builder. The inheritance follows `+` semantics: elements with the same key are replaced, so `launch(Dispatchers.IO)` keeps the parent's name and exception handler but changes the dispatcher. The `Job` is the exception, since a child always gets a fresh `Job` whose parent is the parent's `Job`, which is what links the two lifetimes together.

## Code
```kotlin
launch(Dispatchers.IO) {          // overrides dispatcher only
    log(coroutineContext[Job])    // a new child Job
}
```
