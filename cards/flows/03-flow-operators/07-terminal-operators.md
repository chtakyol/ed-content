---
id: flows-terminal-operators
topic: flows/operators
title: Terminal operators
tags: [terminal, collect, reduce]
related: [flows-operators-overview, flows-collecting-flows]
sources:
  - https://kotlinlang.org/docs/coroutines-flow-operators.html
---

## Explanation
Terminal operators turn a flow into a result: `toList` gathers every value, `first` takes one and cancels the upstream, `single` expects exactly one, and `reduce` or `fold` combines the stream into a single value. Most of them are suspend functions, so the calling coroutine waits for completion, failure, or cancellation. `launchIn` is the exception that starts collection in a new coroutine and returns a `Job` instead of a value.

## Code
```kotlin
val total = (1..5).asFlow().reduce { acc, value -> acc + value }
val first = repository.updates().first()
repository.updates().launchIn(scope)
```
