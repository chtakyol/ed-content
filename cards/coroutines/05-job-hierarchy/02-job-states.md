---
id: coroutines-job-states
topic: coroutines/jobs
title: Job states
tags: [job, state, lifecycle]
related: [coroutines-job]
sources:
  - https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-job/
---

## Explanation
A `Job` passes through `New`, `Active`, `Completing`, `Completed`, and, if cancelled, `Cancelling` then `Cancelled`. The state that surprises people is `Completing`: the coroutine's own body has finished, but its children have not, so it is still active while it waits for them. `isActive` is true in both `Active` and `Completing`, which is why code that checks it before doing work can still be interrupted by children finishing underneath it. `isCompleted`, `isCancelled` and `isActive` are queries over these states, not separate flags.

## Code
```kotlin
if (job.isActive) { ... }    // Active or Completing
job.isCompleted              // Completed or Cancelled
```
