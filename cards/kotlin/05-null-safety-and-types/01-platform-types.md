---
id: kotlin-platform-types
topic: kotlin/null-safety
title: Platform types
tags: [kotlin, null-safety, java-interop]
related: [kotlin-nullable-types, kotlin-java-interop-pitfalls]
sources:
  - https://kotlinlang.org/docs/java-interop.html#null-safety-and-platform-types
---

## Explanation
Kotlin treats types coming from Java as platform types such as `String!`, meaning the compiler does not know whether null is allowed. You can assign a platform type to either a nullable or a non-nullable Kotlin type, and the compiler trusts your choice without inserting a check. Assigning to a non-null type is a promise, and if the Java code returns null at runtime the failure surfaces later as a `NullPointerException` at the first use. Treat Android framework and Java library results as nullable unless the documentation and annotations guarantee otherwise, and prefer APIs annotated with `@Nullable` or `@NonNull`.

## Code
```kotlin
// Java: class LegacyProfile { String nickname() { return null; } }
val profile = LegacyProfile()

val nickname = profile.nickname()        // platform type String!
val unsafe: String = profile.nickname()  // compiles, may crash at runtime
val safe: String? = profile.nickname()
```
