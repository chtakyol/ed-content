---
id: di-constructor-injection
topic: dependency-injection/foundations
title: Constructor injection
tags: [di, constructor-injection, design]
related: [di-manual-di, di-service-locator-vs-di]
sources:
  - https://developer.android.com/training/dependency-injection
---

## Explanation
Constructor injection passes dependencies as constructor parameters, so an object cannot exist without its collaborators and its fields can be `val`. This is the clearest form of DI: the signature documents the dependencies, tests construct the object directly with fakes, and there is no hidden lookup or nullable initialization. Use it for classes you control, including ViewModels, use cases, repositories, and state holders. For framework-instantiated types such as Activities or Fragments, use field injection or a framework such as Hilt, because you do not call their constructors.

## Code
```kotlin
class MarkArticleRead(
    private val repository: ArticleRepository,
    private val clock: Clock,
) {
    suspend operator fun invoke(id: ArticleId) {
        repository.markRead(id, at = clock.now())
    }
}
```
