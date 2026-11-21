---
id: solid-polymorphic-extension
topic: solid/ocp
title: Polymorphic extension
tags: [solid, ocp, polymorphism]
related: [oop-polymorphism-overview, solid-strategy-pattern]
sources:
  - https://kotlinlang.org/docs/interfaces.html
---

## Explanation
Polymorphic extension replaces a growing conditional with a call through a shared type. The caller knows only the contract, and each implementation owns one variant of the behavior, so adding a variant means adding a class rather than editing every branch. This is the most common way to satisfy the open-closed principle in Kotlin and Android, because interfaces and sealed types are cheap to define. The tradeoff is indirection: readers must find the implementations to understand all variants, so keep the contract small and the set of implementations discoverable. For a genuinely fixed set, a sealed hierarchy with an exhaustive `when` is often clearer than open-ended polymorphism.

## Code
```kotlin
interface Binder {
    fun bind(view: View, item: ListItem)
}

class HeaderBinder : Binder { /* ... */ }
class ArticleBinder : Binder { /* ... */ }

class ListAdapter(private val binders: Map<KClass<*>, Binder>)
```
