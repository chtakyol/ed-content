---
id: solid-compose-slots
topic: solid/ocp
title: Compose slots
tags: [solid, ocp, compose]
related: [solid-polymorphic-extension, architecture-ui-layer]
sources:
  - https://developer.android.com/develop/ui/compose/layouts/basics
---

## Explanation
Compose's slot API is the open-closed principle in UI form: a component accepts lambdas for the parts a caller may want to vary, so new content can be added without changing the component. A `Card` that takes a `content` slot can host text today and an image tomorrow, while the card itself stays the same. Slots also keep the component free of feature-specific knowledge, because the caller supplies the content. The tradeoff is a less guided API: document defaults and keep the number of slots manageable so the component does not become a generic container with no identity.

## Code
```kotlin
@Composable
fun ArticleScaffold(
    header: @Composable () -> Unit,
    content: @Composable () -> Unit,
) {
    Column {
        header()
        content()
    }
}
```
