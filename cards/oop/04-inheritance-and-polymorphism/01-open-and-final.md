---
id: oop-open-and-final
topic: oop/inheritance
title: Open and final
tags: [oop, inheritance, kotlin]
related: [oop-inheritance-overview, solid-lsp-definition]
sources:
  - https://kotlinlang.org/docs/inheritance.html
---

## Explanation
Kotlin classes, methods, and properties are final unless marked `open`, which makes inheritance a deliberate design decision rather than an accident. A final class has a closed contract: adding behavior means composition or a new type, not subclassing. An open class promises that subclasses can rely on its overridable members, so those members need documented behavior and should not change casually. In Android, keep framework base classes such as activities and fragments final or very small, and use interfaces or composition when behavior needs to vary.

## Code
```kotlin
open class SyncWorker {
    open fun sync() { /* ... */ }
}

final class ArticleSyncWorker : SyncWorker() {
    override fun sync() { /* ... */ }
}
```
