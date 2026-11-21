---
id: kotlin-safe-calls-and-elvis
topic: kotlin/basics
title: Safe calls and the Elvis operator
tags: [kotlin, null-safety, operators]
related: [kotlin-nullable-types, kotlin-scope-functions]
sources:
  - https://kotlinlang.org/docs/null-safety.html
---

## Explanation
The safe-call operator `?.` accesses a member only when the receiver is non-null and otherwise yields null, so a chain stops at the first null instead of throwing. The Elvis operator `?:` supplies a fallback when the left side is null, which is the idiomatic way to supply defaults such as an empty list or a loading state. Both are expressions, so they nest naturally inside `when`, `return`, and property initializers. Use an explicit `if` when the null branch needs several statements, and avoid long safe-call chains that hide which step produced the null.

## Code
```kotlin
val user: User? = repository.currentUser()

val name = user?.profile?.name ?: "Guest"
val articles = user?.articles ?: emptyList()
```
