---
id: solid-extracting-use-cases
topic: solid/srp
title: Extracting use cases
tags: [solid, srp, use-cases]
related: [architecture-use-cases, solid-when-to-split]
sources:
  - https://developer.android.com/topic/architecture/domain-layer
---

## Explanation
A use case extracts one business operation from a screen or repository so it has a name, a single reason to change, and a testable surface. It is justified when the operation combines sources, enforces a rule, or is reused by several screens, such as "mark as read and update the unread count." A use case that only forwards a call to a repository adds indirection without adding a rule. Name it after the operation, keep it small, and inject its dependencies. In Android, use cases belong in the optional domain layer and should not touch Android framework types.

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
