---
id: flows-operators-overview
topic: flows/operators
title: Intermediate vs terminal operators
tags: [operators, laziness, terminal]
related: [flows-flow-builder, flows-terminal-operators]
sources:
  - https://kotlinlang.org/docs/coroutines-flow-operators.html
---

## Explanation
Flow operators split into two kinds. Intermediate operators such as `map`, `filter`, and `onEach` return a new `Flow` and do no work when they are called; they only describe a stage in the chain. Terminal operators such as `collect`, `toList`, `first`, and `launchIn` actually start the flow and consume values. A chain with no terminal operator is therefore dead code, and adding another collector starts the whole chain again rather than reusing results.

## Code
```kotlin
val chain = flowOf(1, 2, 3)
    .map { it * 2 }        // intermediate, not running yet

chain.collect { }          // terminal, starts the flow
```
