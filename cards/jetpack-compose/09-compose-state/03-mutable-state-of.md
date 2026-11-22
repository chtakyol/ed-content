---
id: compose-mutable-state-of
topic: jetpack-compose/state
title: mutableStateOf
tags: [compose, state, snapshot]
related: [compose-state-in-compose, compose-custom-savers]
sources:
  - https://developer.android.com/develop/ui/compose/state
---

## Explanation
`mutableStateOf` creates a `MutableState<T>` that Compose can observe. Writes go through a `MutableState` policy that decides whether a new value counts as a change; the default uses structural equality, so assigning an equal value does not trigger recomposition. Use `mutableIntStateOf`, `mutableLongStateOf`, and `mutableFloatStateOf` for primitives to avoid boxing. For collections, prefer immutable snapshots and replace the list rather than mutating it in place, because an in-place mutation does not produce a new state value.

## Code
```kotlin
val count = remember { mutableIntStateOf(0) }
val items = remember { mutableStateOf(emptyList<Article>()) }

count.intValue++
items.value = items.value + newArticle   // new list instance
```
