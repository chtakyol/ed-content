---
id: oop-visibility-modifiers
topic: oop/encapsulation
title: Visibility modifiers
tags: [oop, encapsulation, visibility]
related: [oop-properties-vs-fields, oop-invariants]
sources:
  - https://kotlinlang.org/docs/visibility-modifiers.html
---

## Explanation
Kotlin offers `private`, `protected`, `internal`, and `public`, with `public` as the default. `private` restricts access to the containing declaration, `protected` opens it to subclasses, `internal` exposes it within the module, and `public` exposes it everywhere. Start as private as possible and widen only when a real caller needs access, because a narrow surface is easier to change and test. In Android, `internal` is useful for sharing code across Gradle modules in the same app while keeping it out of a published library's API, and `private` keeps ViewModel collaborators from leaking into the UI.

## Code
```kotlin
class ArticleViewModel(
    private val repository: ArticleRepository,
) : ViewModel() {
    private val _state = MutableStateFlow(ArticleUiState.Loading)
    val state: StateFlow<ArticleUiState> = _state

    internal fun refresh() { /* ... */ }
}
```
