---
id: flows-retry-when
topic: flows/errors
title: retryWhen
tags: [retry, backoff, errors]
related: [flows-retry, flows-catch]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`retryWhen` is the flexible form of `retry`: its lambda receives the attempt number and the cause, and it may suspend before returning `true` to resubscribe or `false` to give up. The attempt number starts at zero for the first failure, and the suspend capability is what makes delays and exponential backoff possible. As with `retry`, the upstream starts over, so plan for repeated side effects and cap the attempts for failures that will never recover.

## Code
```kotlin
networkFlow().retryWhen { attempt, cause ->
    if (cause !is IOException || attempt >= 3) return@retryWhen false
    delay(1_000L * (attempt + 1))
    true
}
```
