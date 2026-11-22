---
id: compose-composable-functions
topic: jetpack-compose/mental-model
title: Composable functions
tags: [compose, composables, mental-model]
related: [compose-declarative-ui, compose-composition]
sources:
  - https://developer.android.com/develop/ui/compose/mental-model
---

## Explanation
A composable function is annotated with `@Composable` and describes a piece of UI. It may call other composables, but it must be fast, free of side effects, and idempotent: calling it with the same inputs should produce the same description. Composables can be called only from other composables or from a Compose entry point such as `setContent`. Keep them small and focused, pass state in and events out, and move expensive work or suspension into effects or state holders rather than the composable body.

## Code
```kotlin
@Composable
fun ArticleRow(
    title: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    Text(
        text = title,
        modifier = modifier.clickable(onClick = onClick),
    )
}
```
