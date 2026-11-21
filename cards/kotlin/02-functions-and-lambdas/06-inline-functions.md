---
id: kotlin-inline-functions
topic: kotlin/functions
title: Inline functions
tags: [kotlin, functions, performance]
related: [kotlin-higher-order-functions, kotlin-reified-types]
sources:
  - https://kotlinlang.org/docs/inline-functions.html
---

## Explanation
An `inline` function asks the compiler to copy its body and lambda arguments into each call site, which removes the allocation of a lambda object and enables non-local returns. This matters for small, frequently called helpers such as collection operators and scope functions, but it also increases bytecode size, so large functions should not be inlined. `noinline` keeps a specific lambda as an object, and `crossinline` forbids non-local returns when the lambda runs in another context such as a nested callback. Inline functions can also expose type parameters through `reified`, which is useful for APIs that need the runtime class.

## Code
```kotlin
inline fun <T> T.alsoLog(message: String): T {
    Log.d("App", "$message: $this")
    return this
}

inline fun <reified T> Bundle.getTyped(key: String): T? =
    get(key) as? T
```
