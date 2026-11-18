---
id: coroutines-dispatchers
topic: coroutines/context
title: Dispatchers
tags: [dispatcher, threads, context]
related: [coroutines-default-vs-io, coroutines-main-dispatcher, coroutines-unconfined]
sources:
  - https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html
---

## Explanation
A dispatcher decides which thread or pool of threads a coroutine resumes on. It is not a thread itself and the mapping is not one to one: a single dispatcher may own several threads, and a single coroutine may resume on a different thread after each suspension. That indirection is the point, because it lets a suspended coroutine wait without holding a thread while the dispatcher keeps its threads busy with other coroutines. The standard choices are `Default`, `IO`, `Main` and `Unconfined`.

## Code
```kotlin
launch(Dispatchers.IO) {
    val data = readFile()   // resumes on an IO thread
}
```
