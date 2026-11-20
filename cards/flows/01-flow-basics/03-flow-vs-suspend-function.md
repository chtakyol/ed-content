---
id: flows-flow-vs-suspend-function
topic: flows/basics
title: Flow vs suspend function
tags: [suspend, basics, comparison]
related: [flows-what-is-flow, flows-flow-vs-sequence]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
A suspend function answers one question and returns one value, while a flow describes a stream that may produce zero, one, or many values over time. Returning a `List` from a suspend function also delivers many values, but it must compute all of them before the caller sees the first one, and the caller cannot cancel between elements. A flow emits incrementally, so the consumer can start working on the first value while the producer is still busy, and cancellation or a slow collector propagates back upstream.

## Code
```kotlin
suspend fun loadUser(): User

fun observeUser(): Flow<User>   // zero or more updates over time
```
