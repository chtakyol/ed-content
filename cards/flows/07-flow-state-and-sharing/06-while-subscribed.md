---
id: flows-while-subscribed
topic: flows/state
title: WhileSubscribed
tags: [whilesubscribed, sharing, lifecycle]
related: [flows-state-in-share-in, flows-shared-flow-cancellation]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`SharingStarted.WhileSubscribed` keeps the upstream running only while the shared flow has subscribers, and stops it after a configurable grace period when the last one leaves. The delay avoids tearing down and rebuilding the source during short gaps such as a configuration change or a screen briefly leaving the foreground. `replayExpirationMillis` controls how long the replay cache survives after that, so a returning subscriber may get the last value immediately or wait for a fresh one. It is the usual policy for flows tied to a UI lifecycle.

## Code
```kotlin
source.stateIn(
    scope,
    SharingStarted.WhileSubscribed(stopTimeoutMillis = 5_000),
    initial = Loading,
)
```
