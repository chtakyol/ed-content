---
id: compose-composition-lifecycle
topic: jetpack-compose/lifecycle
title: Composition lifecycle
tags: [compose, lifecycle, composition]
related: [compose-entering-and-leaving, compose-effects-and-lifecycle]
sources:
  - https://developer.android.com/develop/ui/compose/lifecycle
---

## Explanation
A composable's lifecycle is defined by the composition: it enters when Compose first calls it, is recomposed while its inputs or state change, and leaves when it is removed from the tree. `remember` values and effects live exactly as long as that composition node. This is different from an Activity or Fragment lifecycle: a composable can enter and leave many times without the screen being destroyed, for example when a list item scrolls off screen. Tie resources to the composition through effects so they are acquired when the node enters and released when it leaves.

## Code
```kotlin
@Composable
fun Clock() {
    var now by remember { mutableStateOf(System.currentTimeMillis()) }
    LaunchedEffect(Unit) {
        while (true) {
            now = System.currentTimeMillis()
            delay(1_000)
        }
    }
    Text(now.toString())
}
```
