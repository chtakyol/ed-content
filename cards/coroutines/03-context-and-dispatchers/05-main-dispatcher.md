---
id: coroutines-main-dispatcher
topic: coroutines/context
title: Dispatchers.Main
tags: [dispatcher, ui, android]
related: [coroutines-dispatchers]
sources:
  - https://developer.android.com/kotlin/coroutines
  - https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html
---

## Explanation
`Dispatchers.Main` targets the platform's single UI thread, which is where view updates must happen. It is not part of the core library: on Android it comes from `kotlinx-coroutines-android`, on JavaFX and Swing from their own artifacts, and on a plain JVM it does not exist at all, so touching it throws an exception at runtime. Only cheap, immediate work belongs on it; anything that suspends or blocks should be moved off with `withContext`.

## Code
```kotlin
viewModelScope.launch {
    val user = withContext(Dispatchers.IO) { load() }
    render(user)            // back on Main
}
```
