---
id: kotlin-higher-order-functions
topic: kotlin/functions
title: Higher-order functions
tags: [kotlin, functions, lambdas]
related: [kotlin-trailing-lambdas, kotlin-inline-functions]
sources:
  - https://kotlinlang.org/docs/lambdas.html
---

## Explanation
A higher-order function takes a function as a parameter or returns one, which lets behavior be passed around like data. Function types are written as `(Input) -> Output`, and a lambda or a function reference satisfies them. This is how Android APIs accept click handlers, retry policies, and state reducers without requiring a new interface for every callback. Prefer a named function type or `typealias` when the signature gets long, and keep the lambda contract narrow so callers do not need to know internal details.

## Code
```kotlin
fun <T> retry(
    attempts: Int = 3,
    block: suspend () -> T,
): T { /* ... */ }

retry(attempts = 2) {
    repository.refresh()
}
```
