---
id: oop-properties-vs-fields
topic: oop/encapsulation
title: Properties vs fields
tags: [oop, encapsulation, properties]
related: [oop-visibility-modifiers, oop-invariants]
sources:
  - https://kotlinlang.org/docs/properties.html
---

## Explanation
A field is raw storage, while a property is a named access point that may compute a value, validate an assignment, or expose a read-only view. Kotlin makes every property look like a field at the call site, but a custom getter or setter is where encapsulation can live. Expose a read-only property when callers should see a value but not change it, and use a private setter or a function when changes must follow a rule. A public `var` with no validation is effectively a public field and gives up the protection a class is supposed to provide.

## Code
```kotlin
class Profile {
    private var storedName: String = ""

    val name: String
        get() = storedName.ifBlank { "Anonymous" }

    fun rename(value: String) {
        storedName = value.trim()
    }
}
```
