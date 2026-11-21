---
id: kotlin-val-and-var
topic: kotlin/basics
title: val and var
tags: [kotlin, variables, immutability]
related: [kotlin-types-and-inference, oop-immutability]
sources:
  - https://kotlinlang.org/docs/basic-syntax.html
---

## Explanation
Kotlin declares variables with `val` for a read-only reference and `var` for a reassignable one. A `val` does not make the object itself immutable, it only prevents the reference from being pointed at something else, so a `val` list can still be a mutable list. Prefer `val` by default and reach for `var` only when a value genuinely changes over time, such as a retry counter or an editable form field. In Android code, `val` is the normal choice for dependencies, view references, and collected state, which also makes the surrounding code easier to reason about.

## Code
```kotlin
val repository: ArticleRepository = ...   // cannot be reassigned
var retryCount = 0

retryCount++                              // fine
// repository = otherRepository           // compile error
```
