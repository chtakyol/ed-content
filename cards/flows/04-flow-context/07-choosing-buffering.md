---
id: flows-choosing-buffering
topic: flows/context
title: buffer vs conflate vs collectLatest
tags: [buffer, conflate, collectlatest]
related: [flows-buffer, flows-conflate, flows-collect-latest]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
These three operators solve different problems. `buffer` preserves every value and only overlaps production with consumption, so it is the choice for throughput. `conflate` drops values that the collector has not started yet and always delivers the latest, which suits state that should be fresh rather than complete. `collectLatest` delivers every value but cancels the previous value's processing, which suits work that becomes obsolete. `conflate` and `collectLatest` are often combined when both skipping and cancelling are wanted.

## Code
```kotlin
flow.buffer()                 // keep all, overlap stages
flow.conflate()               // keep latest only
flow.collectLatest { ... }    // cancel stale processing
```
