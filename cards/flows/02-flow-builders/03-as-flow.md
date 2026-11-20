---
id: flows-as-flow
topic: flows/builders
title: asFlow
tags: [builder, collections, conversion]
related: [flows-flow-of, flows-flow-vs-sequence]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`asFlow` converts an existing iterable, sequence, array, or range into a cold flow that emits its elements in order. It is an adapter rather than a new source of concurrency: the underlying collection is still iterated sequentially, and no work happens until collection starts. Use it when an API expects a flow but the data already exists in memory; use `flow {}` when producing the values itself needs to suspend.

## Code
```kotlin
listOf("a", "b").asFlow().collect { println(it) }
(1..3).asFlow()
```
