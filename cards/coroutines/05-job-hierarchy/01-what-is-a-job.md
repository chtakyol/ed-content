---
id: coroutines-job
topic: coroutines/jobs
title: What is a Job
tags: [job, lifecycle, context]
related: [coroutines-job-states, coroutines-job-join, coroutines-parent-child-jobs]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
  - https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-job/
---

## Explanation
A `Job` is the handle to a coroutine's lifetime: it knows whether that coroutine is running, finished, or cancelled, and it is the object you cancel or wait on. Every coroutine gets one when it is started, and the same `Job` sits in its context, so "the coroutine" and "the `Job` in its context" are two views of one thing. A `Job` is not a thread and does not run code, it only represents work that something else is executing.

## Code
```kotlin
val job = scope.launch { work() }
job.isActive        // is it still running
```
