---
id: coroutines-coroutine-scope
topic: coroutines/scopes
title: What is a scope
tags: [scope, lifetime, job]
related: [coroutines-creating-a-scope, coroutines-scope-vs-context]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
A `CoroutineScope` is little more than the `CoroutineContext` it carries, but that small wrapper is where lifetime lives. It holds no coroutines of its own; it only remembers the `Job` its children attach to, so cancelling the scope cancels all of them at once. Building a scope is how you say "everything started in here dies together", which is why choosing a scope is really choosing who is allowed to outlive what. A scope is not a coroutine and running code in one still requires a builder.

## Code
```kotlin
val scope = CoroutineScope(Dispatchers.Default)
scope.launch { work() }    // child of the scope
```
