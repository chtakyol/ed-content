---
id: solid-inheritance-hazards
topic: solid/lsp
title: Inheritance hazards
tags: [solid, lsp, inheritance]
related: [oop-fragile-base-class, solid-composition-instead-of-subclassing]
sources:
  - https://refactoring.guru/smells/refused-bequest
---

## Explanation
Inheritance is hazardous when a subtype cannot support every behavior of the parent, when it only needs part of the parent's interface, or when it must override methods with empty or throwing bodies. Refused bequest, where a subclass ignores inherited members, is a strong sign that the "is a" relationship is false. Android code hits this with base activities that expose permissions or analytics every screen must inherit, even screens that do not use them. Before subclassing, ask whether the child satisfies the parent's contract in full; if not, extract the shared piece and compose it instead.

## Code
```kotlin
open class Screen {
    open fun requestPermissions() = Unit
    open fun trackScreenView() = Unit
}

// A settings screen does not need camera permissions.
class SettingsScreen : Screen() {
    override fun requestPermissions() = Unit   // refused bequest
}
```
