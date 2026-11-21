---
id: architecture-remember-saveable
topic: architecture/lifecycle
title: rememberSaveable
tags: [compose, state, savedstate]
related: [architecture-saved-instance-state, architecture-viewmodel-vs-saved-state]
sources:
  - https://developer.android.com/topic/libraries/architecture/saving-states
---

## Explanation
`rememberSaveable` keeps a value across recomposition, activity recreation, and process death by writing it into the saved instance state bundle. It is the Compose equivalent of `onSaveInstanceState` for local UI state. It works with types that can go into a `Bundle`, or with a custom `Saver`, so it suits strings, numbers, and small objects. For screen data that comes from a repository, use a ViewModel instead and keep this for transient input.

## Code
```kotlin
@Composable
fun SearchField() {
    var query by rememberSaveable { mutableStateOf("") }
    TextField(
        value = query,
        onValueChange = { query = it },
    )
}
```
