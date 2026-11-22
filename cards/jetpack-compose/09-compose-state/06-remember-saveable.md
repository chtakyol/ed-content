---
id: compose-remember-saveable
topic: jetpack-compose/state
title: rememberSaveable
tags: [compose, state, saved-state]
related: [compose-state-lifespans, compose-custom-savers]
sources:
  - https://developer.android.com/develop/ui/compose/state-saving
---

## Explanation
`rememberSaveable` behaves like `remember` but also writes the value into the saved instance state, so it survives configuration changes and process death. It works automatically for types that `Bundle` supports, such as primitives, strings, and `Parcelable`. Use it for UI state that should be restored after rotation, like a search query, a selected tab, or scroll position. Do not use it for large objects or business data, because the saved state is limited and not meant to be a database; put those in a `ViewModel` or repository.

## Code
```kotlin
@Composable
fun SearchScreen() {
    var query by rememberSaveable { mutableStateOf("") }
    var selectedTab by rememberSaveable { mutableIntStateOf(0) }

    SearchField(query, onQueryChange = { query = it })
}
```
