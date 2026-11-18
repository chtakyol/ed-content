---
id: coroutines-structured-guarantees
topic: coroutines/structured-concurrency
title: What structured concurrency buys
tags: [structure, lifetime, guarantees]
related: [coroutines-parent-child-jobs, coroutines-breaking-structure]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
Structured concurrency is the guarantee that a coroutine cannot outlive the scope that started it. Three things follow from it. A parent cannot finish while its children run, so nothing is left behind when a function returns. Cancellation is bounded by the tree, so cancelling one part of the program cannot silently reach unrelated work. And failures surface where the work was started, instead of disappearing into a thread that nobody is watching. Unstructured threads and callbacks offer none of these, which is the actual reason to prefer coroutines over them.

## Code
```kotlin
coroutineScope {
    launch { work() }   // nothing returns until this ends
}
```
