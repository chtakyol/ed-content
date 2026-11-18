---
id: coroutines-what-is-coroutine
topic: coroutines/basic
title: What is a coroutine?
tags: [suspend, concurrency, basics]
related: [coroutines-suspend-functions, coroutines-suspension-points]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
A coroutine is an instance of a suspendable computation. It is conceptually similar to a thread, in that it takes a block of code and runs it concurrently with the rest of the code. Unlike a thread, a coroutine is not bound to any particular thread: it can suspend its execution at a suspension point and resume later, possibly on a different thread. A suspended coroutine holds no thread while it waits, so a single thread can host many coroutines at once.
