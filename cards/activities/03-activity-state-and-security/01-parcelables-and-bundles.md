---
id: activity-parcelables-and-bundles
topic: activities/state
title: Parcelables and Bundles
tags: [activities, parcelable, bundle]
related: [activity-passing-data-between-activities, architecture-intents]
sources:
  - https://developer.android.com/guide/components/activities/parcelables-and-bundles
---

## Explanation
A `Bundle` is a key-value container the system can pass across process boundaries, and `Parcelable` is the Android interface for serializing an object into one. The `kotlin-parcelize` plugin generates the implementation for `@Parcelize` classes. Bundles are intended for small amounts of data: the transaction buffer is limited, and exceeding it throws `TransactionTooLargeException`. Pass ids or small value objects and let the receiving screen load the rest from a repository, rather than sending large object graphs through an intent.

## Code
```kotlin
@Parcelize
data class ArticleArgs(val id: String, val title: String) : Parcelable

intent.putExtra("args", ArticleArgs(id = "1", title = "Compose"))
val args = intent.getParcelableExtra("args", ArticleArgs::class.java)
```
