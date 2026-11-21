---
id: kotlin-extension-functions-in-android
topic: kotlin/android
title: Extension functions in Android
tags: [kotlin, android, extensions]
related: [kotlin-functions, oop-program-to-an-interface]
sources:
  - https://kotlinlang.org/docs/extensions.html
  - https://developer.android.com/kotlin/extensions
---

## Explanation
An extension function adds a callable function to a type without modifying it, which is how Kotlin code adds helpers to Android framework classes. A `View.gone()` or `Context.dp()` extension keeps call sites short and avoids a utility class full of static methods. Extensions are resolved statically, so they cannot override member functions and they do not participate in polymorphism through an interface reference. Keep them small, name them after the effect, and put them in a focused file so they are discoverable instead of scattering one-off helpers across the codebase.

## Code
```kotlin
fun View.gone() {
    visibility = View.GONE
}

fun Context.dp(value: Int): Int =
    (value * resources.displayMetrics.density).toInt()

toolbar.gone()
val padding = dp(16)
```
