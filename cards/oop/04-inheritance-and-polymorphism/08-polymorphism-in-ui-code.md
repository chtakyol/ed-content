---
id: oop-polymorphism-in-ui-code
topic: oop/inheritance
title: Polymorphism in UI code
tags: [oop, polymorphism, ui]
related: [oop-polymorphism-overview, architecture-ui-state]
sources:
  - https://developer.android.com/topic/architecture/ui-layer
---

## Explanation
UI code is full of polymorphism even when it does not look like a class hierarchy. A composable that accepts a `UiState` renders a different branch per subtype, an adapter binds different view types through a shared contract, and a screen depends on a state holder interface so a preview or test can supply a fake. The benefit is one call site that handles all variants without a growing chain of flags and `if` statements. The cost is indirection, so keep the hierarchy small and make the variants meaningful to the screen rather than mirroring every framework detail.

## Code
```kotlin
sealed interface ListItem {
    data class Header(val title: String) : ListItem
    data class Article(val id: String, val title: String) : ListItem
}

fun bind(item: ListItem) = when (item) {
    is ListItem.Header -> showHeader(item.title)
    is ListItem.Article -> showArticle(item)
}
```
