---
id: coroutines-parent-child-jobs
topic: coroutines/jobs
title: Parent and child jobs
tags: [job, hierarchy, structure]
related: [coroutines-supervisor-job, coroutines-coroutine-scope]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
Every coroutine started in a scope becomes a child of that scope's `Job`, so `Job`s form a tree that mirrors the code that created them. A parent does not reach `Completed` while any child is still running, which is why a launched coroutine cannot be forgotten and left behind. Signals travel both ways along those edges: cancelling a parent cancels its children, and a child failing cancels its parent, which in turn cancels the parent's other children. That reciprocity is the mechanism behind structured concurrency, not a side effect.

## Code
```kotlin
coroutineScope {
    launch { child() }   // parent completes only after this
}
```
