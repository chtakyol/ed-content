---
id: architecture-udf
topic: architecture/ui
title: Unidirectional data flow in the UI
tags: [ui, udf, events]
related: [architecture-unidirectional-data-flow, architecture-ui-state]
sources:
  - https://developer.android.com/topic/architecture/ui-layer
---

## Explanation
In the UI layer, state is produced by the state holder and rendered by the composable, while user actions travel the other way as function calls. The composable never mutates the state object it receives. This single-writer rule eliminates bugs where two callbacks update overlapping fields, and it makes each interaction reproducible: an action goes in, and a new state comes out. It also means a composable can be previewed or tested with a fixed state and a no-op handler.

## Code
```kotlin
@Composable
fun SearchBar(
    state: SearchUiState,
    onQueryChange: (String) -> Unit,
) {
    TextField(
        value = state.query,
        onValueChange = onQueryChange,
    )
}
```
