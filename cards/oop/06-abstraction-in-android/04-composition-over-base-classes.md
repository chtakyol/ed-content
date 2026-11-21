---
id: oop-composition-over-base-classes
topic: oop/android
title: Composition over base classes
tags: [oop, composition, android]
related: [oop-composition-over-inheritance, oop-delegation-in-android]
sources:
  - https://developer.android.com/topic/architecture/ui-layer
---

## Explanation
Android code has a long history of base classes such as `BaseActivity`, `BaseFragment`, and `BaseViewModel`, and they often grow into a pile of unrelated helpers that every screen inherits. Composition lets a screen hold the small pieces it needs, such as an analytics tracker, a permission helper, or a state holder, instead of inheriting all of them. This keeps dependencies visible in the constructor and avoids the fragile base class problem when one screen needs a different behavior. Base classes are still reasonable for a genuinely shared, stable lifecycle contract, but keep them thin and final where possible.

## Code
```kotlin
class ArticleViewModel(
    private val repository: ArticleRepository,
    private val analytics: Analytics,
    private val clock: Clock,
) : ViewModel() {
    fun refresh() {
        analytics.track("refresh", clock.now())
        viewModelScope.launch { repository.refresh() }
    }
}
```
