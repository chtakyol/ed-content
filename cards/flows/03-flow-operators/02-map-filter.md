---
id: flows-map-filter
topic: flows/operators
title: map and filter
tags: [map, filter, operators]
related: [flows-operators-overview, flows-transform]
sources:
  - https://kotlinlang.org/docs/coroutines-flow-operators.html
---

## Explanation
`map` transforms each emitted value, and `filter` drops values that do not match a predicate; both return a new flow and run lazily for every collector. Their lambdas are suspending, so a transformation may call a suspend function, unlike the equivalent sequence operators. Order matters for both correctness and cost: putting `filter` before an expensive `map` avoids transforming values that will be discarded, while putting it after changes how many downstream emissions occur.

## Code
```kotlin
flowOf(1, 2, 3, 4)
    .filter { it % 2 == 0 }
    .map { it * 10 }
    .collect { println(it) }   // 20, 40
```
