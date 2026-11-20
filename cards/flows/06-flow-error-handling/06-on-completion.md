---
id: flows-on-completion
topic: flows/errors
title: onCompletion
tags: [oncompletion, cleanup, errors]
related: [flows-cleanup-finally, flows-catch]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`onCompletion` registers an action that runs after the upstream finishes, whether normally, with an exception, or because it was cancelled. Its lambda receives the cause, which is `null` for a normal completion and the exception otherwise, so it is the natural place for logging or resource cleanup at the end of a chain. It does not swallow the failure: the exception continues downstream unless the action throws something else. Unlike `finally` inside the builder, it is an operator and can sit at the point in the chain where you want to observe completion.

## Code
```kotlin
repository.updates()
    .onCompletion { cause ->
        if (cause == null) log("done") else log("failed", cause)
    }
    .collect { render(it) }
```
