---
id: flows-shared-flow
topic: flows/state
title: SharedFlow
tags: [sharedflow, hot, replay]
related: [flows-cold-vs-hot, flows-state-flow, flows-replay]
sources:
  - https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-shared-flow/
---

## Explanation
`SharedFlow` is a hot broadcast stream: it has no initial value, it can have any number of collectors, and every collector receives the same emissions. A replay cache can deliver the last few values to new subscribers, but without replay a subscriber sees only values emitted after it started collecting. `MutableSharedFlow` is the writable side, with `emit` suspending when the buffer is full and `tryEmit` returning a result instead. It is suited to events and broadcasts, not to representing a single current state.

## Code
```kotlin
val events = MutableSharedFlow<String>(replay = 1)

events.collect { println(it) }
events.emit("saved")
```
