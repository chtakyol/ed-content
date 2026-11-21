---
id: kotlin-java-interop-pitfalls
topic: kotlin/android
title: Java interop pitfalls
tags: [kotlin, android, java-interop]
related: [kotlin-platform-types, kotlin-sam-conversions]
sources:
  - https://kotlinlang.org/docs/java-interop.html
---

## Explanation
Kotlin interoperates with Java and the Android framework, but a few seams need care. Java getters and setters become synthetic properties, platform types hide nullability, and Java's checked exceptions are not enforced in Kotlin. Static members are accessed through the class name, while Kotlin `object` members need `INSTANCE` or `@JvmStatic` for Java callers. Reserved keywords such as `in`, `is`, and `object` must be escaped with backticks when they are Java identifiers. Keep interop code close to the Java boundary and wrap it in a small Kotlin adapter so the rest of the codebase sees idiomatic types.

## Code
```kotlin
// Java class: class LegacyStore { static String read() { ... } }
val value = LegacyStore.read()

// Kotlin object used from Java needs INSTANCE or @JvmStatic.
object Flags {
    @JvmStatic fun enabled(): Boolean = true
}
```
