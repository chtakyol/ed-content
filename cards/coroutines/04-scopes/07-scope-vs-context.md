---
id: coroutines-scope-vs-context
topic: coroutines/scopes
title: Scope vs context
tags: [scope, context, receiver]
related: [coroutines-context-inheritance]
sources:
  - https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html
---

## Explanation
A scope is the ability to start coroutines; a context is the configuration of a coroutine that already exists. That is why `launch` and `async` are extensions on `CoroutineScope`: something has to play the role of the parent when a new coroutine is created. Inside a suspend function there is no scope, only `coroutineContext`, because a coroutine that is already running only needs to read its setting, not start children. The two connect through the scope's `coroutineContext` property, which is exactly the context new children inherit.

## Code
```kotlin
fun CoroutineScope.track() = launch { log() }   // scope: start

suspend fun whoAmI() = coroutineContext[Job]    // context: read
```
