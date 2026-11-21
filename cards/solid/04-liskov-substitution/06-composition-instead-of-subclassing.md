---
id: solid-composition-instead-of-subclassing
topic: solid/lsp
title: Composition instead of subclassing
tags: [solid, lsp, composition]
related: [oop-composition-over-inheritance, solid-inheritance-hazards]
sources:
  - https://refactoring.guru/design-patterns/composite
---

## Explanation
When a subtype cannot honor the parent's contract, composition is usually the correct fix. Instead of extending a class and inheriting behavior it cannot support, the new type holds the behavior as a collaborator and exposes only the operations that make sense. This removes the false "is a" claim and makes the reused behavior replaceable and testable. In Android, a screen can hold an analytics tracker and a permission helper rather than extending a base class that bundles both. Composition also lets a type reuse behavior from several sources without the single-inheritance limit.

## Code
```kotlin
class AnalyticsTracker(private val client: AnalyticsClient) {
    fun screenView(name: String) = client.track("screen_view", name)
}

class SettingsScreen(
    private val analytics: AnalyticsTracker,
    private val permissions: PermissionHelper,
) {
    fun onResume() = analytics.screenView("settings")
}
```
