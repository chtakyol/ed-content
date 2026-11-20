---
id: flows-collecting-flows
topic: flows/basics
title: Collecting a flow
tags: [collect, terminal, cancellation]
related: [flows-what-is-flow, flows-terminal-operators]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`collect` is the basic terminal operator: it starts the flow and suspends until the upstream completes, fails, or is cancelled. Its lambda is a suspend function that runs for every emitted value, so the collector may itself wait between values. Because collection happens in the caller's coroutine, cancelling that coroutine cancels the flow; there is no separate subscription to dispose of. When you do not want to block the current coroutine, `launchIn(scope)` starts the same collection in a new coroutine and returns a `Job`.

## Code
```kotlin
flow.collect { value ->
    save(value)
}

flow.launchIn(scope)   // collect in the background
```
