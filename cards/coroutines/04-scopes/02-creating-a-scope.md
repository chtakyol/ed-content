---
id: coroutines-creating-a-scope
topic: coroutines/scopes
title: Creating a scope
tags: [scope, factory, supervisorjob]
related: [coroutines-scope-builder, coroutines-global-scope, coroutines-lifecycle-scopes]
sources:
  - https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html
---

## Explanation
`CoroutineScope(context)` is a plain factory: you hand it a context and get a scope whose lifetime is that context's `Job`. Combining a `SupervisorJob` with a dispatcher is the usual recipe, because a single failing child should not take down the whole scope. A scope you create is a resource like any other, so it needs an owner that cancels it when the surrounding work ends, otherwise its children keep running with nothing left to stop them. `MainScope()` is the same idea preconfigured for UI work.

## Code
```kotlin
val scope = CoroutineScope(SupervisorJob() + Dispatchers.Main)
// ...
scope.cancel()             // cancels every child
```
