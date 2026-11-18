---
id: coroutines-suspend-main
topic: coroutines/builders
title: suspend fun main
tags: [main, entry-point, suspend]
related: [coroutines-runblocking]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
Kotlin lets the entry point itself be a suspend function, so `suspend fun main()` can call suspend functions directly without a `runBlocking` wrapper. The compiler generates the necessary bridge, which means the body is still driven from a real main thread, but the source no longer implies that blocking is part of the design. Use it for new programs; reach for `runBlocking` only where the surrounding API forces a blocking signature.

## Code
```kotlin
suspend fun main() {
    val user = loadUser("42")
    println(user)
}
```
