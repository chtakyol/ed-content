---
id: flows-flow-vs-reactive-streams
topic: flows/basics
title: Flow vs reactive streams
tags: [reactive, rxjava, comparison]
related: [flows-what-is-flow, flows-cold-vs-hot]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
Flow occupies the same role as RxJava's `Observable` or `Flowable`, but it is built directly on coroutines rather than on a separate subscription protocol. Backpressure comes from suspension: a slow collector simply suspends `emit`, so there is no `request(n)` bookkeeping and no separate `Disposable`. A plain flow is cold and has one collector per collection, while shared and state flows cover the hot, multicast cases. Interop exists in both directions, so an existing reactive stack can be adapted instead of rewritten.

## Code
```kotlin
val rxFlow: Flow<Int> = rxObservable.asFlow()
val publisher = flow.asPublisher()   // reactive-streams interop
```
