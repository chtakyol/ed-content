---
id: kotlin-scope-functions
topic: kotlin/idioms
title: Scope functions
tags: [kotlin, idioms, scope-functions]
related: [kotlin-safe-calls-and-elvis, kotlin-dsl-builders]
sources:
  - https://kotlinlang.org/docs/scope-functions.html
---

## Explanation
Kotlin's scope functions run a block with an object in scope: `let` and `also` expose it as `it`, while `run`, `apply`, and `with` expose it as `this`. `let` returns the block result and is common for null handling, `also` returns the receiver and is used for side effects, `apply` returns the receiver and configures it, and `run` returns the block result. The differences are small, so choose based on the return value you need and the receiver style that reads best. Avoid nesting several scope functions, because `this` and `it` become ambiguous; a named local variable is clearer.

## Code
```kotlin
val articles = repository.load()
    .also { Log.d("Repo", "loaded ${it.size}") }
    .filter { !it.isDraft }

val intent = Intent(context, DetailActivity::class.java).apply {
    putExtra("id", article.id)
}
```
