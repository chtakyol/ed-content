---
id: coroutines-withcontext
topic: coroutines/context
title: withContext
tags: [withcontext, dispatcher, suspension]
related: [coroutines-dispatchers, coroutines-context-inheritance]
sources:
  - https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html
---

## Explanation
`withContext` runs a block with a different context and restores the previous one when the block finishes. It is a suspend function, so the caller waits for it, but it waits without blocking, and it returns the block's value. Because the switch is atomic with respect to cancellation, a `withContext` block either runs to completion or does not start at all, which is what makes it safe for work that must not be left half-done.

## Code
```kotlin
val text = withContext(Dispatchers.IO) {
    file.readText()         // context differs here
}                           // previous context restored
```
