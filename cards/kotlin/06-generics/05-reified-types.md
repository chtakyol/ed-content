---
id: kotlin-reified-types
topic: kotlin/generics
title: Reified types
tags: [kotlin, generics, inline]
related: [kotlin-inline-functions, kotlin-generic-functions-and-classes]
sources:
  - https://kotlinlang.org/docs/inline-classes.html#reified-type-parameters
---

## Explanation
Normally a generic type parameter is erased at runtime, so a function cannot check `T::class` or create a `T`. Marking a function `inline` and its type parameter `reified` lets the compiler substitute the actual type at each call site, which makes those operations possible. This is how Android helpers such as typed `Bundle` accessors, `startActivity<T>`, and `Retrofit`-style factories avoid passing a separate `Class<T>` argument. Reified types are only available in inline functions, and they increase bytecode at every call site, so use them for small convenience helpers rather than large implementations.

## Code
```kotlin
inline fun <reified T : Activity> Context.startActivity() {
    startActivity(Intent(this, T::class.java))
}

inline fun <reified T> Bundle.require(key: String): T =
    requireNotNull(get(key) as? T) { "Missing $key" }
```
