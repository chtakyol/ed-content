---
id: coroutines-suspend-functions
topic: coroutines/basic
title: Suspend functions
tags: [suspend, functions, basics]
related: [coroutines-suspension-points]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
A suspend function is a function marked with the `suspend` modifier. It may suspend the coroutine that calls it, and in return it is allowed to call other suspend functions. It can only be called from a coroutine or from another suspend function, because the caller needs to be able to suspend as well. Declaring a function `suspend` does not start a coroutine and does not create a thread; it only marks that the function may pause.

## Code
```kotlin
suspend fun loadUser(id: String): User {
    delay(100)              // suspends the caller
    return api.user(id)
}
```
