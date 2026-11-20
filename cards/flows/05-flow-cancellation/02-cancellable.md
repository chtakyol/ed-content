---
id: flows-cancellable
topic: flows/cancellation
title: cancellable
tags: [cancellable, cancellation, operator]
related: [flows-cancellation-cooperative, flows-timeouts]
sources:
  - https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/cancellable.html
---

## Explanation
`cancellable()` adds a cancellation check around each emission of the upstream flow. It is a shortcut for `onEach { currentCoroutineContext().ensureActive() }`. The flow builder and the shared flow implementations already check cancellation when they emit, so this operator matters mainly for custom or third-party `Flow` implementations that might keep producing after their collector has been cancelled. It is a safety net at the boundary, not a replacement for cancellation checks inside the producer itself.

## Code
```kotlin
thirdPartyFlow()
    .cancellable()   // ensureActive() before each value
    .collect { process(it) }
```
