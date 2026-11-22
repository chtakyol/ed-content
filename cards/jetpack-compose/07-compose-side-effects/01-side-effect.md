---
id: compose-side-effect
topic: jetpack-compose/side-effects
title: SideEffect
tags: [compose, effects, side-effect]
related: [compose-effects-and-lifecycle, compose-launched-effect]
sources:
  - https://developer.android.com/develop/ui/compose/side-effects
---

## Explanation
`SideEffect` runs a block after every successful composition, which makes it useful for publishing Compose state to code that is not Compose-aware. It runs on every recomposition, so it must be cheap and safe to repeat. Typical uses are updating an external analytics object, syncing a window title, or notifying a callback with the latest value. It does not launch a coroutine and does not clean up after itself; use `DisposableEffect` when setup and teardown are paired, and `LaunchedEffect` for suspending work.

## Code
```kotlin
@Composable
fun ScreenTitle(title: String, onTitleChange: (String) -> Unit) {
    SideEffect {
        onTitleChange(title)
    }
}
```
