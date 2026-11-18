---
id: coroutines-runblocking
topic: coroutines/builders
title: runBlocking
tags: [runblocking, blocking, entry-point]
related: [coroutines-builders-overview, coroutines-suspend-main]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
`runBlocking` runs its body as a coroutine and blocks the current thread until everything inside it completes, then returns the body's value. It exists to bridge the blocking world and the suspending one, which is why it belongs at program entry points and in tests, not in application code. Calling it inside a coroutine wastes a thread, because that thread is parked while the work it could be running waits.

## Code
```kotlin
fun main() = runBlocking {
    val user = loadUser("42")   // main thread parked here
    println(user)
}
```
