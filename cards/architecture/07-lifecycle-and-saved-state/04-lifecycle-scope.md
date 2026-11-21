---
id: architecture-lifecycle-scope
topic: architecture/lifecycle
title: lifecycleScope
tags: [lifecycle, coroutines, scope]
related: [architecture-repeat-on-lifecycle, architecture-lifecycle-basics]
sources:
  - https://developer.android.com/topic/libraries/architecture/coroutines
---

## Explanation
`lifecycleScope` is a `CoroutineScope` tied to a `LifecycleOwner`; it is cancelled when the owner is destroyed. Launching UI work there means the coroutine cannot outlive the screen, so it is safe to update state from it. It is not the place for work that must survive navigation or process death, which belongs in a ViewModel or in WorkManager. For streams, prefer `repeatOnLifecycle` over launching a collector that runs for the whole scope.

## Code
```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        lifecycleScope.launch {
            val result = repository.load()
            render(result)
        }
    }
}
```
