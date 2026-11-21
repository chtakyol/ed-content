---
id: solid-base-activity-and-viewmodel
topic: solid/lsp
title: Base Activity and Base ViewModel
tags: [solid, lsp, android]
related: [oop-composition-over-base-classes, oop-fragile-base-class]
sources:
  - https://developer.android.com/topic/architecture/ui-layer
---

## Explanation
`BaseActivity` and `BaseViewModel` are common Android patterns that often violate LSP because they force every screen into one shape. A base ViewModel that exposes a loading flag, an error channel, and a navigation event assumes every screen wants those, so a screen that does not use them either carries dead state or overrides methods with no-ops. A base activity with abstract methods for analytics and permissions forces every subclass to implement behavior it may not need. Prefer small collaborators injected into each screen. If a base type is still useful, keep it minimal and make every member meaningful for all subtypes.

## Code
```kotlin
// Every screen inherits concerns it may not use.
abstract class BaseViewModel : ViewModel() {
    abstract val analyticsEvent: String
    abstract fun onPermissionResult(granted: Boolean)
}

// Each screen composes only what it needs.
class SettingsViewModel(
    private val analytics: Analytics,
) : ViewModel()
```
