---
id: coroutines-global-scope
topic: coroutines/scopes
title: GlobalScope
tags: [globalscope, unstructured, leaking]
related: [coroutines-creating-a-scope]
sources:
  - https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html
---

## Explanation
`GlobalScope` is a scope with no parent, so work started in it is tied to nothing and runs until the process ends. Nothing can cancel it as a group, nothing waits for it, and its failures fall through to the thread's default handler. It exists for the rare case where losing the work is acceptable and the work must outlive every caller, such as flushing anonymous analytics. Everywhere else it is a leak with a friendly name: define one long-lived application scope, hold a reference to it, and cancel that instead.

## Code
```kotlin
GlobalScope.launch {          // outlives the caller
    analytics.flush()
}
```
