---
id: architecture-when-to-use-domain
topic: architecture/domain
title: When to add a domain layer
tags: [domain, architecture, complexity]
related: [architecture-domain-layer, architecture-use-cases]
sources:
  - https://developer.android.com/topic/architecture/domain-layer
---

## Explanation
Add a domain layer when business logic is reused across screens, when a ViewModel mixes several repositories and rules, or when the same operation needs several entry points such as UI, widgets, and background work. Skip it when screens map almost directly to repository data and the extra indirection would only add files. The decision is about complexity rather than purity: the official guidance recommends a domain layer for large apps and leaves it optional for small ones.

## Code
```kotlin
// Before: the ViewModel owns the rule and two repositories.
// After: one use case owns the rule and any screen can reuse it.
class ObserveUnreadCount(
    private val messages: MessagesRepository,
    private val session: SessionRepository,
) {
    operator fun invoke(): Flow<Int> = /* combine both sources */
        TODO()
}
```
