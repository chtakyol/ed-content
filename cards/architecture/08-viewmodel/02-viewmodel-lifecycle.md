---
id: architecture-viewmodel-lifecycle
topic: architecture/viewmodel
title: ViewModel lifecycle
tags: [viewmodel, lifecycle, config-change]
related: [architecture-viewmodel, architecture-config-change-vs-process-death]
sources:
  - https://developer.android.com/topic/libraries/architecture/viewmodel
---

## Explanation
A ViewModel is created when its owner is first accessed and cleared when the owner is finished, not when the activity is merely recreated. On rotation, the same instance is retained and reattached to the new activity; on navigation away, the back stack entry's `ViewModelStore` is cleared. `onCleared` is the place to release resources the ViewModel owns, although `viewModelScope` is cancelled automatically. Avoid launching work in `init` that depends on the object being fully constructed; prefer an explicit initialization point.

## Code
```kotlin
class NewsViewModel(...) : ViewModel() {
    override fun onCleared() {
        super.onCleared()
        // Release resources owned by this ViewModel.
    }
}
```
