---
id: flows-callback-vs-channel-flow
topic: flows/channels
title: callbackFlow vs channelFlow
tags: [callbackflow, channelflow, comparison]
related: [flows-callback-flow, flows-channel-flow]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
Both builders let values enter a flow from outside the normal `emit` path, but they solve different problems. `callbackFlow` is for wrapping an API that pushes values through registered callbacks, and it requires `awaitClose` so that registration and cleanup are paired. `channelFlow` is for spawning your own concurrent producers with `send`, without an external callback to unregister. `callbackFlow` is built on the same channel machinery, so the underlying buffering behavior and the ability to send from other coroutines are shared.

## Code
```kotlin
callbackFlow { api.listen { trySend(it) }; awaitClose { api.stop() } }

channelFlow { launch { send(a()) }; launch { send(b()) } }
```
