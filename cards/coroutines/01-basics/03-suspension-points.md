---
id: coroutines-suspension-points
topic: coroutines/basic
title: Suspension points
tags: [suspend, threads, basics]
related: []
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
A suspension point is a place where a coroutine may pause its execution, which is any call to a suspend function. At that point the compiler has saved the coroutine's state, including its local variables and the position it reached, so the thread is released and can run other code. When the awaited result is ready, the coroutine resumes from that position, possibly on a different thread, with its state restored. Suspension is therefore not blocking: the thread is not parked waiting, it is simply given back.
