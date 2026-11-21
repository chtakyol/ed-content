---
id: solid-principles-together
topic: solid/practice
title: The principles together
tags: [solid, practice, design]
related: [solid-what-is-solid, solid-refactoring-a-screen]
sources:
  - https://developer.android.com/topic/architecture/recommendations
---

## Explanation
The five principles reinforce each other in a well-factored Android feature. A ViewModel with a single responsibility depends on an interface (dependency inversion), that interface is small and role-focused (interface segregation), its implementations honor the same contract (Liskov), and new behavior arrives as a new implementation or sealed variant (open-closed). Applying one principle in isolation often creates awkward code, such as interfaces with one method that nobody substitutes or a split that produces five tightly coupled classes. Use the set as a lens on a real change, and let the design follow the friction rather than the acronym.

## Code
```kotlin
interface ArticleFeed {                     // ISP: one role
    fun observe(): Flow<List<Article>>      // DIP: policy-owned contract
}

class ArticleViewModel(                     // SRP: presentation only
    private val feed: ArticleFeed,
) : ViewModel() {
    val state = feed.observe()
        .map(::toUiState)                   // OCP: new states are variants
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), Loading)
}
```
