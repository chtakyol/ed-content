---
id: coroutines-supervisor-job
topic: coroutines/jobs
title: SupervisorJob
tags: [supervisorjob, failure, isolation]
related: [coroutines-parent-child-jobs, coroutines-coroutinescope-vs-supervisorscope]
sources:
  - https://kotlinlang.org/docs/exception-handling.html
---

## Explanation
A regular `Job` treats its children as one unit: one child failing cancels the parent and therefore every sibling. `SupervisorJob` breaks that upward edge, so a failing child does not cancel its siblings or its parent, and each child must handle its own failure. The downward edge still exists, cancelling the supervisor still cancels everything below it, which is why the common recipe is one supervisor at the top of a long-lived scope. Because nobody above is notified, an unhandled failure inside a supervised child has to be caught there or it goes to the exception handler.

## Code
```kotlin
val scope = CoroutineScope(SupervisorJob() + Dispatchers.Default)
// one child failing leaves the others alive
```
