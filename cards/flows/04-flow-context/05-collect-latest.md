---
id: flows-collect-latest
topic: flows/context
title: collectLatest
tags: [collectlatest, cancellation, latest]
related: [flows-conflate, flows-cancellation-cooperative]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`collectLatest` runs the collector action for each value but cancels that action when the next value arrives, so only the newest value is processed to completion. Unlike `conflate`, the collector still sees every value; the difference is that unfinished work for older values is interrupted. The action must cooperate with cancellation, and any cleanup should be in a `finally` block, because a non-cancellable computation will still run to completion and delay the next value.

## Code
```kotlin
flow.collectLatest { query ->
    val results = search(query)   // cancelled if query changes
    show(results)
}
```
