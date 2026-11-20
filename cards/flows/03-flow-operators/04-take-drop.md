---
id: flows-take-drop
topic: flows/operators
title: take and drop
tags: [take, drop, size-limiting]
related: [flows-operators-overview, flows-terminal-operators]
sources:
  - https://kotlinlang.org/docs/coroutines-flow-operators.html
---

## Explanation
`take(n)` forwards only the first `n` values and then cancels the upstream, which is what makes it safe on an infinite flow. `drop(n)` does the opposite: it silently discards the first `n` values and forwards everything after them, while the upstream keeps running. Neither operator changes the values themselves, and `take(0)` completes immediately without collecting anything upstream.

## Code
```kotlin
(1..100).asFlow()
    .drop(2)      // skip 1, 2
    .take(3)      // stop after 3, 4, 5
    .collect { println(it) }
```
