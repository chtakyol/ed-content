---
id: architecture-anti-patterns
topic: architecture/viewmodel
title: ViewModel anti-patterns
tags: [viewmodel, context, lifecycle]
related: [architecture-viewmodel, architecture-handling-events]
sources:
  - https://developer.android.com/topic/architecture/recommendations
---

## Explanation
Common ViewModel mistakes include holding a `Context`, `Activity`, `View`, or `Resources`, using `AndroidViewModel` to reach `Application`, putting data access or navigation directly in the ViewModel, and scoping one ViewModel to every screen. Another is launching work in `init` so construction has side effects. These patterns leak memory, make testing hard, or tie the ViewModel to one UI. Keep dependencies as constructor-injected abstractions and expose immutable state.

## Code
```kotlin
// Avoid: holds a Context and reaches into Android resources.
class BadViewModel(app: Application) : AndroidViewModel(app)

// Prefer: inject only what the screen needs.
class GoodViewModel(
    private val repository: NewsRepository,
) : ViewModel()
```
