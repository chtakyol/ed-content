---
id: kotlin-ranges-and-loops
topic: kotlin/basics
title: Ranges and loops
tags: [kotlin, loops, ranges]
related: [kotlin-when-expressions, kotlin-collection-types]
sources:
  - https://kotlinlang.org/docs/ranges.html
---

## Explanation
Kotlin expresses numeric progressions with `..`, `until`, `downTo`, and `step`, and iterates them with `for`. `0..10` includes both ends while `0 until 10` excludes the upper bound, which is the common choice when indexing a list. `repeat(n)` is a compact loop when the index is not needed, and collection helpers such as `forEach`, `map`, and `filter` usually replace manual iteration. Android code rarely needs index loops except for paging, grid positions, or working with APIs that require positions.

## Code
```kotlin
for (i in 0 until articles.size) {
    bind(articles[i], position = i)
}

repeat(3) { attempt ->
    retry(attempt)
}

for (page in 10 downTo 1 step 2) load(page)
```
