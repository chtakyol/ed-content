---
id: coroutines-coroutine-context
topic: coroutines/context
title: CoroutineContext
tags: [context, job, dispatcher]
related: [coroutines-context-elements, coroutines-context-inheritance]
sources:
  - https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html
---

## Explanation
A `CoroutineContext` is an immutable, indexed set of elements. Each element is identified by a key, so a context behaves like a map that can hold at most one dispatcher, one `Job`, one `CoroutineName` and so on. It is immutable: combining two contexts with `+` returns a new context in which elements from the right-hand side replace elements with the same key, and nothing else changes. Every coroutine carries one, and inside a suspend function it is reachable as the `coroutineContext` property.

## Code
```kotlin
val ctx = Dispatchers.IO + CoroutineName("sync")
ctx[CoroutineName]?.name      // "sync"
```
