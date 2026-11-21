---
id: kotlin-group-and-associate
topic: kotlin/collections
title: groupBy and associate
tags: [kotlin, collections, grouping]
related: [kotlin-map-filter, kotlin-collection-types]
sources:
  - https://kotlinlang.org/docs/collection-grouping.html
---

## Explanation
`groupBy` turns a list into a map of key to list of matching elements, which is the standard way to build sections, buckets, or date groups. `associateBy` builds a map of key to element, keeping the last element for a duplicate key, while `associateWith` builds key to derived value. These functions replace nested loops and repeated `getOrPut` calls, and they make the grouping rule explicit in one line. In Android, grouping is common for sectioned lists, calendar headers, and settings screens.

## Code
```kotlin
val byCategory: Map<String, List<Article>> =
    articles.groupBy { it.category }

val byId: Map<String, Article> =
    articles.associateBy { it.id }
```
