---
id: kotlin-default-and-named-arguments
topic: kotlin/functions
title: Default and named arguments
tags: [kotlin, functions, api-design]
related: [kotlin-functions, kotlin-java-interop-pitfalls]
sources:
  - https://kotlinlang.org/docs/functions.html#default-arguments
---

## Explanation
Parameters can declare default values, so callers omit them instead of passing overloads of placeholder values. Named arguments make calls self-documenting and let a caller skip an earlier optional parameter without resorting to positional guesses. This combination often removes whole families of overloaded functions, which is why Android APIs written in Kotlin tend to expose a single well-named function. When Java callers need the same convenience, annotate the function with `@JvmOverloads` so the compiler generates the bridge overloads.

## Code
```kotlin
fun loadArticles(
    category: String = "all",
    limit: Int = 20,
    includeDrafts: Boolean = false,
): List<Article> = repository.load(category, limit, includeDrafts)

loadArticles(includeDrafts = true)
```
