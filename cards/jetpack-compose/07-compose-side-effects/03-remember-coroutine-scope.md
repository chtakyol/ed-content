---
id: compose-remember-coroutine-scope
topic: jetpack-compose/side-effects
title: rememberCoroutineScope
tags: [compose, effects, coroutines]
related: [compose-launched-effect, compose-side-effect]
sources:
  - https://developer.android.com/develop/ui/compose/side-effects
---

## Explanation
`rememberCoroutineScope()` returns a scope bound to the composition, so coroutines launched from event callbacks are cancelled when the composable leaves. Use it when a user action starts suspending work, such as a button that saves a draft or scrolls a list, because a composable body cannot launch a coroutine directly. The scope is for callbacks, not for lifecycle work that should start automatically; use `LaunchedEffect` for that. Do not capture the scope beyond the composition, and do not use it for work that must outlive the screen.

## Code
```kotlin
@Composable
fun SaveButton(onSave: suspend () -> Unit) {
    val scope = rememberCoroutineScope()

    Button(onClick = {
        scope.launch { onSave() }
    }) {
        Text("Save")
    }
}
```
