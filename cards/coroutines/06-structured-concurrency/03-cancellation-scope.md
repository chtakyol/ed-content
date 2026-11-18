---
id: coroutines-cancellation-scope
topic: coroutines/structured-concurrency
title: Cancellation is scoped
tags: [cancellation, tree, scope]
related: [coroutines-job, coroutines-after-cancellation]
sources:
  - https://kotlinlang.org/docs/cancellation-and-timeouts.html
---

## Explanation
Cancelling a `Job` cancels exactly the subtree rooted at that `Job`, and nothing else. Children of the cancelled node go down with it, siblings of the node do not, and the node's parent is untouched, which is what makes cancellation a safe operation to perform on any handle you hold. The reverse is not true: a child cannot cancel its parent, and a child never finishes in a state that leaves the parent running on its behalf. This asymmetry is why cancellation is described as propagating downwards only.

## Code
```kotlin
val a = scope.launch { workA() }
val b = scope.launch { workB() }
a.cancel()          // b keeps running
```
