---
id: flows-empty-flow
topic: flows/builders
title: emptyFlow
tags: [builder, empty, no-op]
related: [flows-flow-of, flows-as-flow]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`emptyFlow()` is a flow that emits nothing and completes immediately. It exists so that a branch which has no data can still return the same flow type as the other branches, without a special nullable case at the call site. Collecting it is legal and simply returns, and operators downstream are never invoked. It is the flow equivalent of an empty list, not of a failed or cancelled stream.

## Code
```kotlin
fun search(query: String): Flow<Result> =
    if (query.isBlank()) emptyFlow() else api.search(query)
```
