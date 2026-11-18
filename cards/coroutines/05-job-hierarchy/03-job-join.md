---
id: coroutines-job-join
topic: coroutines/jobs
title: join
tags: [job, join, suspension]
related: [coroutines-parent-child-jobs]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
`join()` suspends the calling coroutine until the target `Job` reaches a terminal state, then resumes. It waits without blocking, so the thread is free while it waits, and that is the whole difference between `join()` and a thread's `join`. Joining does not rethrow the target's failure: a failed or cancelled `Job` still counts as complete, and reporting its outcome is the caller's job. Joining an already finished `Job` returns immediately, so calling it late is harmless.

## Code
```kotlin
val job = scope.launch { sync() }
job.join()      // suspends this coroutine, not the thread
```
