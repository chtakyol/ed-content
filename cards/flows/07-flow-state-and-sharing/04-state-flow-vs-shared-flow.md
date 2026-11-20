---
id: flows-state-flow-vs-shared-flow
topic: flows/state
title: StateFlow vs SharedFlow
tags: [stateflow, sharedflow, comparison]
related: [flows-state-flow, flows-shared-flow, flows-replay]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`StateFlow` is a specialized `SharedFlow` that always has a value, replays exactly the latest one, and conflates updates; it is designed for state, where the current value is what matters. `SharedFlow` has no initial value and a configurable replay cache, so it can represent events or broadcasts where each emission matters individually. StateFlow also suppresses equal consecutive values, which is helpful for state but can hide repeated events. Choose StateFlow for "what is", SharedFlow for "what happened".

## Code
```kotlin
val state: StateFlow<Mode> = MutableStateFlow(Mode.Idle)
val events: SharedFlow<Event> = MutableSharedFlow()
```
