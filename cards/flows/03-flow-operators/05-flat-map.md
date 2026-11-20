---
id: flows-flat-map
topic: flows/operators
title: flatMapConcat, flatMapMerge, flatMapLatest
tags: [flatmap, concurrency, operators]
related: [flows-transform, flows-sequential-by-default, flows-collect-latest]
sources:
  - https://kotlinlang.org/docs/coroutines-flow-operators.html
---

## Explanation
The `flatMap` family turns each upstream value into its own flow, but the three variants differ in how they combine the inner flows. `flatMapConcat` collects them one at a time, preserving order and waiting for each to finish. `flatMapMerge` collects several concurrently and interleaves their values, so order is not guaranteed. `flatMapLatest` cancels the previous inner flow as soon as a new upstream value arrives, which is the usual choice for search-as-you-type or other work that becomes obsolete.

## Code
```kotlin
queries.flatMapLatest { query ->
    api.search(query)
}.collect { results -> show(results) }
```
