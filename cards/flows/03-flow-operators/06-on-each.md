---
id: flows-on-each
topic: flows/operators
title: onEach
tags: [oneach, side-effects, operators]
related: [flows-operators-overview, flows-collecting-flows]
sources:
  - https://kotlinlang.org/docs/coroutines-flow-operators.html
---

## Explanation
`onEach` runs an action for every value and then passes the value downstream unchanged, which makes it the standard place for logging, metrics, or other side effects in a flow chain. It is an intermediate operator, so it does nothing on its own; collection still has to be triggered by a terminal operator. `onStart` and `onCompletion` cover the beginning and end of the stream, while `onEach` covers only its values.

## Code
```kotlin
repository.updates()
    .onEach { log("received $it") }
    .collect { render(it) }
```
