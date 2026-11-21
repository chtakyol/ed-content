---
id: oop-polymorphism-overview
topic: oop/foundations
title: Polymorphism
tags: [oop, polymorphism, fundamentals]
related: [oop-interfaces, oop-polymorphism-in-ui-code]
sources:
  - https://kotlinlang.org/docs/inheritance.html#overriding-methods
---

## Explanation
Polymorphism lets one call site work with several concrete types through a shared supertype, with the actual behavior chosen at runtime. A function that accepts a `UiState` can render loading, content, or error without knowing which one it received, and a repository interface can be backed by a network implementation in production and a fake in tests. This is what makes abstractions useful: the caller writes one path, and new implementations do not require editing it. Polymorphism is not limited to class inheritance; interfaces, sealed hierarchies, and function values all provide it.

## Code
```kotlin
interface Renderer {
    fun render(state: UiState)
}

class ComposeRenderer : Renderer { /* ... */ }
class ViewRenderer : Renderer { /* ... */ }

fun show(renderer: Renderer, state: UiState) {
    renderer.render(state)   // implementation chosen at runtime
}
```
