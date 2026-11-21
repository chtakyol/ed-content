---
id: kotlin-class-delegation
topic: kotlin/idioms
title: Class delegation
tags: [kotlin, delegation, composition]
related: [oop-delegation-in-android, oop-composition-over-inheritance]
sources:
  - https://kotlinlang.org/docs/delegation.html
---

## Explanation
Kotlin can forward an interface implementation to another object with `class Wrapper(private val inner: Impl) : Interface by inner`. The compiler generates the forwarding methods, so the wrapper only overrides the behavior it wants to change. This is composition without the boilerplate, and it is a strong alternative to inheritance when a class needs to reuse behavior from another type. In Android, class delegation is useful for decorating repositories, adding logging or caching to a data source, and implementing listener interfaces by handing most calls to a default object.

## Code
```kotlin
interface ArticleRepository {
    suspend fun load(): List<Article>
}

class LoggingRepository(
    private val delegate: ArticleRepository,
) : ArticleRepository by delegate {
    override suspend fun load(): List<Article> =
        delegate.load().also { Log.d("Repo", "loaded ${it.size}") }
}
```
