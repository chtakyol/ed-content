---
id: coroutines-structured-concurrency
topic: coroutines/basic
title: Structured concurrency
tags: [scopes, lifecycle, basics]
related: []
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
Coroutines are not started into empty space: they belong to a scope that owns their lifetime. A parent does not complete until all of its children have completed, so a coroutine's work cannot silently outlive the code that started it. This nesting gives concurrency the same shape as the call stack: outer code waits for inner work, and cancellation or failure travels along the same edges. Coroutines therefore form a tree of lifetimes rather than a flat pool of independent tasks.
