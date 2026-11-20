---
id: flows-retry
topic: flows/errors
title: retry
tags: [retry, errors, resubscribe]
related: [flows-catch, flows-retry-when]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`retry` resubscribes to the upstream when it fails, starting a cold flow again from the beginning. `retry(n)` tries at most `n` extra times, `retry()` retries forever, and `retry { cause -> ... }` decides per exception whether another attempt is worthwhile. Because it restarts the source, any side effects before the failure happen again; retry only makes sense when the source is idempotent or the repeat is harmless. It also retries immediately unless the predicate suspends, so backoff needs `retryWhen`.

## Code
```kotlin
networkFlow()
    .retry(3) { cause -> cause is IOException }
    .catch { emit(cached()) }
```
