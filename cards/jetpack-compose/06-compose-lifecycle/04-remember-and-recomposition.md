---
id: compose-remember-and-recomposition
topic: jetpack-compose/lifecycle
title: remember and recomposition
tags: [compose, remember, recomposition]
related: [compose-remember, compose-recomposition]
sources:
  - https://developer.android.com/develop/ui/compose/lifecycle
---

## Explanation
`remember` stores a value in the composition so it survives recomposition. Without it, a local `val` would be recreated on every run and state would reset. `remember` is not a general cache: it is tied to the composable's position, is discarded when the node leaves, and does not survive configuration changes or process death. Use `rememberSaveable` for state that must survive those events, and never use `remember` to hold something that should outlive the screen. Keys passed to `remember` reset the stored value when they change.

## Code
```kotlin
@Composable
fun SearchField() {
    var query by remember { mutableStateOf("") }
    // query survives recomposition, but not recreation.

    val formatter = remember { DateFormatter() }
    TextField(value = query, onValueChange = { query = it })
}
```
