---
id: coroutines-sequential-execution
topic: coroutines/basic
title: Sequential by default
tags: [suspend, execution, basics]
related: [coroutines-suspension-points]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
Suspend function calls inside a coroutine run sequentially, exactly like ordinary function calls: each call completes before the next one starts. Suspending does not make anything concurrent by itself, it only frees the thread while the current call waits for its result. Concurrency has to be requested explicitly, so code that merely suspends on several calls is still a straight line in time.

## Code
```kotlin
val a = fetchA()   // runs, then waits
val b = fetchB()   // starts only after a is done
```
