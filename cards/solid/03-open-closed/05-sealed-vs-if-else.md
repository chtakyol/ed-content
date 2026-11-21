---
id: solid-sealed-vs-if-else
topic: solid/ocp
title: Sealed types vs if-else
tags: [solid, ocp, sealed]
related: [oop-sealed-hierarchies, kotlin-sealed-classes]
sources:
  - https://kotlinlang.org/docs/sealed-classes.html
---

## Explanation
A sealed hierarchy and an `if`/`else` chain can express the same cases, but they differ in where change lands. With a sealed type, each variant is a named type, and the compiler forces every consumer to handle it; adding a variant changes the type and produces errors at the places that need attention. With flags and `if` chains, adding a case silently falls through until someone remembers every branch. Sealed types are the better default for a closed set of states such as loading, content, error, or empty. If the set is open because plugins or feature modules can add cases, use an interface instead.

## Code
```kotlin
// Closed set: adding Video means every when must be updated.
sealed interface Media {
    data class Image(val url: String) : Media
    data class Text(val value: String) : Media
}

fun render(media: Media) = when (media) {
    is Media.Image -> showImage(media.url)
    is Media.Text -> showText(media.value)
}
```
