---
id: compose-ui-and-state-holders
topic: jetpack-compose/architecture
title: UI and state holders
tags: [compose, architecture, state-holder]
related: [compose-architecture-overview, architecture-state-holders]
sources:
  - https://developer.android.com/develop/ui/compose/architecture
---

## Explanation
The composable is the UI: it renders state, handles input, and calls events. The state holder owns mutable state and the rules that change it, and exposes immutable state to the UI. A ViewModel is the right holder when state must survive configuration changes or be shared across destinations; a `remember`-scoped holder is enough for transient UI state such as scroll position or an expanded row. Keeping the holder out of the composable makes it testable and prevents recomposition from resetting state unexpectedly.

## Code
```kotlin
class SearchStateHolder {
    var query by mutableStateOf("")
        private set

    fun onQueryChange(value: String) {
        query = value
    }
}

@Composable
fun SearchScreen() {
    val holder = remember { SearchStateHolder() }
    SearchField(holder.query, holder::onQueryChange)
}
```
