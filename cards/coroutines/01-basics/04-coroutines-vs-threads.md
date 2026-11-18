---
id: coroutines-coroutines-vs-threads
topic: coroutines/basic
title: Coroutines vs threads
tags: [threads, performance, basics]
related: [coroutines-what-is-coroutine]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
On the JVM and in Kotlin/Native, all concurrent code, such as coroutines, runs on threads managed by the operating system. Coroutines can suspend their execution instead of blocking a thread. This allows one coroutine to suspend while waiting for some data to arrive and another coroutine to run on the same thread, ensuring effective resource utilization. Because a suspended coroutine costs only its saved state rather than an OS thread, thousands of them can share a handful of threads, while each thread carries its own stack and is expensive to create and switch.
