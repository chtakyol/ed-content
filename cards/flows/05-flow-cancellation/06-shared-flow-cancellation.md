---
id: flows-shared-flow-cancellation
topic: flows/cancellation
title: Cancelling shared flows
tags: [sharedflow, cancellation, sharing]
related: [flows-shared-flow, flows-state-in-share-in, flows-cancellation-cooperative]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
A shared flow is hot, so cancelling one collector only removes that subscriber; it does not stop the upstream that is feeding the shared flow. That upstream runs in the coroutine scope passed to `shareIn` or `stateIn`, and it stops when that scope is cancelled or when the sharing strategy decides there are no subscribers left. To shut a shared flow down for good, cancel the owning scope or the `Job` that started it, not an individual collection.

## Code
```kotlin
val shared = source.shareIn(appScope, SharingStarted.WhileSubscribed(5_000))

val job = scope.launch { shared.collect { render(it) } }
job.cancel()          // removes one subscriber, upstream keeps running
appScope.cancel()     // stops the sharing coroutine itself
```
