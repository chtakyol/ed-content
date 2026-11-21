---
id: kotlin-by-lazy
topic: kotlin/idioms
title: by lazy
tags: [kotlin, delegation, lazy]
related: [kotlin-observable-delegates, kotlin-delegates-in-viewmodels]
sources:
  - https://kotlinlang.org/docs/delegated-properties.html#lazy
---

## Explanation
`by lazy` initializes a property on first access and caches the result for later reads. It is thread-safe by default using the synchronized lazy mode, and `LazyThreadSafetyMode.NONE` removes that cost when the property is only touched from one thread. This is a good fit for expensive values that may never be needed, such as a formatted description or a database-backed lookup. It is a poor fit for values that depend on a short-lived Android context, because the cached value outlives the component and can leak or become stale.

## Code
```kotlin
val formattedSum: String by lazy {
    articles.sumOf { it.words }.toString()
}

class Screen {
    val adapter by lazy { ArticleAdapter() }
}
```
