---
id: architecture-lifecycle-basics
topic: architecture/lifecycle
title: Lifecycle states and events
tags: [lifecycle, states, events]
related: [architecture-lifecycle-owners, architecture-lifecycle-aware-components]
sources:
  - https://developer.android.com/topic/libraries/architecture/lifecycle
---

## Explanation
Every activity and fragment has a lifecycle: a sequence of states such as created, started, resumed, and destroyed, with events marking transitions between them. Components need to acquire resources when they become active and release them when they stop, or they leak listeners, collectors, and camera handles. The lifecycle API exposes these transitions so libraries can react without the screen overriding every callback manually. Treat the lifecycle as the authority on whether a piece of work is still relevant.

## Code
```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        lifecycle.addObserver(MyObserver())
        setContent { App() }
    }
}
```
