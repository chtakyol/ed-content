---
id: flows-catch-placement
topic: flows/errors
title: Where to place catch
tags: [catch, operators, errors]
related: [flows-catch, flows-exception-transparency]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`catch` only sees exceptions from the part of the chain above it, so its position decides what it can handle. Placed right after the source, it covers failures from the source and any operators before it, but not a crash in `map` below it. Placed at the end, it covers the whole upstream, but a failure in the collector is still outside its reach. Put it where the fallback makes sense: close to the operation that can fail if only that operation is recoverable, or at the end if any upstream failure should degrade the whole stream.

## Code
```kotlin
source()
    .map { parse(it) }
    .catch { emit(default) }   // covers source and map
    .collect { render(it) }    // not covered
```
