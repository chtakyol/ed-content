---
id: solid-plugin-points
topic: solid/ocp
title: Plugin points
tags: [solid, ocp, extensibility]
related: [solid-extension-over-modification, solid-strategy-pattern]
sources:
  - https://developer.android.com/topic/libraries/app-startup
---

## Explanation
A plugin point is a deliberate extension seam, such as a registry of handlers, a strategy supplied by a feature module, or a listener list that other modules can add to. It lets a core module stay stable while feature modules contribute behavior. Plugin points need a clear contract, a way to register and discover implementations, and a policy for ordering and failure. Too many plugin points turn a simple call into a mystery, because the actual behavior is spread across modules and hard to trace. Add one when an external module or a second implementation genuinely needs to contribute, not as speculative flexibility.

## Code
```kotlin
interface StartupTask {
    suspend fun run()
}

class TaskRegistry {
    private val tasks = mutableListOf<StartupTask>()
    fun register(task: StartupTask) { tasks += task }
    suspend fun runAll() = tasks.forEach { it.run() }
}
```
