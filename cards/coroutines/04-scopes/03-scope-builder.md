---
id: coroutines-scope-builder
topic: coroutines/scopes
title: coroutineScope builder
tags: [coroutinescope, structured, nested]
related: [coroutines-coroutinescope-vs-supervisorscope]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
`coroutineScope {}` creates a scope and runs a block inside it, suspending the caller until the block and every coroutine started inside it have finished. It returns the block's value, so it reads like a regular function call rather than a jump into the background. The scope it creates is a real child scope, so a failure inside cancels its siblings and propagates outward, which makes it the standard way to fan work out inside a suspend function without leaking anything.

## Code
```kotlin
suspend fun loadBoth() = coroutineScope {
    val a = async { loadA() }
    val b = async { loadB() }
    a.await() + b.await()
}
```
