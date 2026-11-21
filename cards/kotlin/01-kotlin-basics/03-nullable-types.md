---
id: kotlin-nullable-types
topic: kotlin/basics
title: Nullable types
tags: [kotlin, null-safety, types]
related: [kotlin-safe-calls-and-elvis, kotlin-platform-types]
sources:
  - https://kotlinlang.org/docs/null-safety.html
---

## Explanation
In Kotlin a type is either non-nullable or explicitly nullable with `?`, and the compiler forbids calling members on a nullable value without handling the null case. This turns a common Android crash source, such as a missing intent extra or a null view, into a compile-time decision. Nullable types compose with generics and collections, so `List<String>?` means the list may be absent while `List<String?>` means its elements may be null. Model absence in the type instead of relying on documentation or runtime checks.

## Code
```kotlin
val nickname: String? = intent.getStringExtra("nickname")
// nickname.length             // compile error

val length = nickname?.length ?: 0
```
