---
id: coroutines-failure-containment
topic: coroutines/structured-concurrency
title: Failure containment
tags: [failure, supervisor, boundary]
related: [coroutines-supervisor-job, coroutines-exception-propagation]
sources:
  - https://kotlinlang.org/docs/exception-handling.html
---

## Explanation
A failure does not stop at the coroutine that produced it. It cancels that coroutine's parent, and the parent then cancels its remaining children, so an unhandled failure removes the whole subtree that shares the `Job`. The place where that spread stops is a `SupervisorJob`: below it, children fail independently, and above it, the parent is unaffected. Containment is therefore not a property you configure once, it is the deliberate placement of supervisors around the work that should fail as a unit.

## Code
```kotlin
val scope = CoroutineScope(SupervisorJob())
// failure here stops at the supervisor, not above
```
