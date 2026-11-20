---
id: flows-transform
topic: flows/operators
title: transform
tags: [transform, emit, operators]
related: [flows-map-filter, flows-flat-map]
sources:
  - https://kotlinlang.org/docs/coroutines-flow-operators.html
---

## Explanation
`transform` is the general intermediate operator: it gives its lambda a `FlowCollector` receiver, so the lambda can emit zero, one, or many values for each upstream value. `map` is a `transform` that emits exactly one value, and `filter` is one that emits either the original value or nothing. Reach for `transform` when the number of outputs depends on the input, such as expanding one item into several or skipping it conditionally, without adding another flow layer.

## Code
```kotlin
flowOf(1, 2, 3).transform { value ->
    emit(value)
    if (value > 1) emit(-value)
}.collect { println(it) }   // 1, 2, -2, 3, -3
```
