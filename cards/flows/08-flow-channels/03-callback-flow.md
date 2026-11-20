---
id: flows-callback-flow
topic: flows/channels
title: callbackFlow
tags: [callbackflow, callbacks, awaitclose]
related: [flows-channel-flow, flows-callback-vs-channel-flow, flows-buffer]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`callbackFlow` adapts a callback-based API into a cold flow. Its block registers the callback and sends values with `trySend`, then calls `awaitClose` to suspend until the flow is closed, unregistering the callback in that block. `awaitClose` is mandatory: without it the builder completes immediately and the callback has nowhere to send. Callbacks are not suspend functions, which is why `trySend` is used there and `send` is reserved for coroutine contexts.

## Code
```kotlin
fun locationUpdates(): Flow<Location> = callbackFlow {
    val listener = LocationListener { location -> trySend(location) }
    api.register(listener)

    awaitClose { api.unregister(listener) }
}
```
