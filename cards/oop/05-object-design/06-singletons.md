---
id: oop-singletons
topic: oop/object-design
title: Singletons
tags: [oop, singleton, lifecycle]
related: [kotlin-objects-and-companions, oop-dependency-injection]
sources:
  - https://developer.android.com/training/dependency-injection
---

## Explanation
A singleton is a type with exactly one instance for the process lifetime. Kotlin's `object` declaration provides one, and `by lazy` on a top-level property or a DI container can provide the same guarantee. Singletons are convenient for truly process-wide, stateless infrastructure such as a clock or a logger. They become a problem when they hold mutable state, hide dependencies, or keep a context reference, because tests cannot isolate them and the lifetime is the whole process. Prefer injecting a single instance through a container so the constraint is visible in the constructor.

## Code
```kotlin
object AppClock {
    fun now(): Long = System.currentTimeMillis()
}

class SyncWorker(
    private val clock: AppClock = AppClock,
) {
    fun isStale(lastSync: Long) = clock.now() - lastSync > 60_000
}
```
