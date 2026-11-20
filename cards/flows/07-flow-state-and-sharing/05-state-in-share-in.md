---
id: flows-state-in-share-in
topic: flows/state
title: stateIn and shareIn
tags: [statein, sharein, sharing]
related: [flows-state-flow, flows-shared-flow, flows-while-subscribed]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`stateIn` and `shareIn` turn a cold flow into a hot one by starting its collection in a scope you provide. `stateIn` returns a `StateFlow` and requires an initial value, while `shareIn` returns a `SharedFlow` and takes a replay count instead. Both take a `SharingStarted` policy that controls when the upstream runs, such as immediately, on first subscriber, or only while subscribers exist. The scope owns the upstream, so cancelling it stops the sharing for everyone.

## Code
```kotlin
val state = source.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), Loading)
val events = source.shareIn(viewModelScope, SharingStarted.Lazily, replay = 1)
```
