---
id: flows-cold-streams
topic: flows/basics
title: Flows are cold
tags: [cold, laziness, collection]
related: [flows-what-is-flow, flows-collecting-flows, flows-cold-vs-hot]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
A cold flow does nothing until it is collected, and each collection starts the producer again from the beginning. The `flow {}` block is not a running task that emits into the world; it is a recipe that runs once per collector, in that collector's coroutine. Two collectors therefore see two independent executions, including any side effects such as network calls, and neither one sees values emitted before it subscribed. This is what makes flows cheap to define and safe to pass around, but it also means that collecting the same flow twice repeats the work.

## Code
```kotlin
val flow = flow {
    println("producing")
    emit(1)
}

flow.collect { }   // producing
flow.collect { }   // producing again
```
