---
id: oop-delegation-in-android
topic: oop/android
title: Delegation in Android
tags: [oop, delegation, android]
related: [kotlin-class-delegation, oop-composition-over-base-classes]
sources:
  - https://kotlinlang.org/docs/delegation.html
---

## Explanation
Delegation forwards a responsibility to a collaborator while keeping the public type intact. In Android it is useful for decorating a repository with logging or caching, implementing a listener interface by handing most callbacks to a default, and splitting a large ViewModel into smaller delegates that each own one concern. Kotlin's `by` keyword generates forwarding methods for interface delegation, and manual delegation is fine when only a couple of methods are involved. The result is composition with a small surface, and tests can target the delegate without the surrounding screen.

## Code
```kotlin
class CachedArticleRepository(
    private val remote: ArticleRepository,
    private val cache: ArticleCache,
) : ArticleRepository by remote {
    override suspend fun load(): List<Article> =
        cache.get() ?: remote.load().also(cache::put)
}
```
