---
id: kotlin-parcelize
topic: kotlin/android
title: Parcelize
tags: [kotlin, android, parcelable]
related: [kotlin-data-classes, architecture-intents]
sources:
  - https://developer.android.com/kotlin/parcelize
---

## Explanation
The `kotlin-parcelize` plugin generates the `Parcelable` implementation for a class annotated with `@Parcelize`, which removes the boilerplate `writeToParcel` and `CREATOR` code. A `@Parcelize data class` is the usual way to pass a small, stable model between activities or destinations. Parcelables are not a general persistence format, and the data must remain compatible across process death and app updates. For navigation, prefer passing ids and reading the entity from the repository, because large or evolving objects are fragile in a `Bundle`.

## Code
```kotlin
@Parcelize
data class ArticleArgs(
    val id: String,
    val title: String,
) : Parcelable

val intent = Intent(context, DetailActivity::class.java)
    .putExtra("args", ArticleArgs(id = "1", title = "Kotlin"))
```
