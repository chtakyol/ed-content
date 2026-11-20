---
id: flows-zip-combine
topic: flows/operators
title: zip and combine
tags: [zip, combine, operators]
related: [flows-map-filter, flows-flat-map]
sources:
  - https://kotlinlang.org/docs/coroutines-flow-operators.html
---

## Explanation
`zip` pairs values by position: it waits for one value from each flow, combines that pair, and finishes as soon as the shorter flow is exhausted. `combine` is looser: it remembers the latest value of each flow, emits whenever either source produces a new value, and keeps going until both complete. Use `zip` when the two streams are parallel representations of the same sequence, and `combine` when they are independent inputs to a derived state.

## Code
```kotlin
val names = flowOf("a", "b")
val ages = flowOf(1, 2)
names.zip(ages) { name, age -> "$name=$age" }   // a=1, b=2

val ui = combine(nameFlow, ageFlow) { name, age -> Profile(name, age) }
```
