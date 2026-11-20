---
id: flows-replay
topic: flows/state
title: Replay
tags: [replay, sharedflow, cache]
related: [flows-shared-flow, flows-state-flow, flows-while-subscribed]
sources:
  - https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-shared-flow/
---

## Explanation
Replay is the number of previously emitted values that a shared flow stores and delivers to each new collector. With `replay = 0` a new subscriber sees only future emissions, with `replay = 1` it immediately gets the most recent value, and larger values keep a short history. `StateFlow` is effectively a shared flow with replay fixed at one and conflation enabled. Replay is a cache, not a queue: it does not replay every historical value, and `resetReplayCache` clears it when old values should not reach new subscribers.

## Code
```kotlin
val flow = MutableSharedFlow<Int>(replay = 2)
flow.emit(1)
flow.emit(2)
flow.collect { println(it) }   // 1, then 2
```
