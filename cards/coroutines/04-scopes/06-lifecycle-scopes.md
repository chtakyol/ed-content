---
id: coroutines-lifecycle-scopes
topic: coroutines/scopes
title: Lifecycle scopes
tags: [android, viewmodelscope, lifecyclescope]
related: [coroutines-creating-a-scope]
sources:
  - https://developer.android.com/kotlin/coroutines
---

## Explanation
Android's architecture components hand you scopes that already own the right lifetime, so you rarely build one by hand. `viewModelScope` is cancelled when the `ViewModel` is cleared, and `lifecycleScope` is cancelled when the `LifecycleOwner` is destroyed. Both are preconfigured with a `SupervisorJob` and `Dispatchers.Main.immediate`, which is why a launch from them can touch views directly. They come from `lifecycle-viewmodel-ktx` and `lifecycle-runtime-ktx`, not from the core coroutines artifact.

## Code
```kotlin
viewModelScope.launch {
    val user = withContext(Dispatchers.IO) { load() }
    show(user)
}
```
