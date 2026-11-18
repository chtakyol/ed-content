---
id: coroutines-coroutinescope-vs-supervisorscope
topic: coroutines/scopes
title: coroutineScope vs supervisorScope
tags: [coroutinescope, supervisorscope, failure]
related: [coroutines-scope-builder, coroutines-structured-concurrency]
sources:
  - https://kotlinlang.org/docs/exception-handling.html
---

## Explanation
`coroutineScope {}` and `supervisorScope {}` both wait for their children before returning, and both rethrow a failure to the caller. The difference is what a failure does to the other children: in `coroutineScope` it cancels the siblings too, so the block fails as one unit, while in `supervisorScope` the failing child is isolated and the rest keep running. Reach for `supervisorScope` when failures are independent and one going wrong should not destroy unrelated work, and remember that isolation leaves the error unreported unless you handle it inside that child.

## Code
```kotlin
supervisorScope {
    launch { fail() }        // does not cancel the sibling
    launch { keepGoing() }
}
```
