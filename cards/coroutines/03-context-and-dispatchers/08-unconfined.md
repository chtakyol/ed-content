---
id: coroutines-unconfined
topic: coroutines/context
title: Dispatchers.Unconfined
tags: [dispatcher, unconfined, threads]
related: [coroutines-dispatchers, coroutines-coroutine-start]
sources:
  - https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html
---

## Explanation
`Dispatchers.Unconfined` starts the coroutine on the thread that called the builder and then resumes it wherever the suspending function decides to resume, with no thread confinement at all. It performs no dispatch and no thread switching for its own sake, which makes it suitable only for coroutines that consume no CPU time and never touch thread-confined state. For the common goal of "run this part without dispatching", `CoroutineStart.UNDISPATCHED` is the targeted tool; `Unconfined` is a lasting property, not a one-time choice.

## Code
```kotlin
launch(Dispatchers.Unconfined) {
    println(Thread.currentThread().name)  // caller's thread
    delay(10)                             // resumes elsewhere
}
```
