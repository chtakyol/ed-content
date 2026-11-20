---
id: flows-flow-of
topic: flows/builders
title: flowOf
tags: [builder, flowof, values]
related: [flows-flow-builder, flows-as-flow, flows-empty-flow]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`flowOf` builds a flow from a fixed list of arguments, emitting them in order and then completing. It is the shortest way to represent a known sequence of values, which makes it useful in tests and in small examples where a full `flow {}` block would add noise. With no arguments it produces an empty flow, and with a single value it behaves like a one-shot source. It never suspends between values unless the downstream asks it to.

## Code
```kotlin
flowOf(1, 2, 3).collect { println(it) }
val empty = flowOf<Int>()
```
