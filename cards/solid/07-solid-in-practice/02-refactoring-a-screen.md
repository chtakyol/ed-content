---
id: solid-refactoring-a-screen
topic: solid/practice
title: Refactoring a screen
tags: [solid, practice, refactoring]
related: [solid-god-classes, solid-principles-together]
sources:
  - https://developer.android.com/topic/architecture/ui-layer
---

## Explanation
A practical SOLID refactor starts from a screen that does too much and moves one responsibility at a time while keeping behavior unchanged. First separate data access behind a repository so the screen no longer knows about Retrofit or Room. Then extract presentation decisions into a state holder and keep the view as a renderer. Extract formatting and analytics into small collaborators, and replace conditional variants with a sealed state or a strategy only where new variants are expected. Run tests after each step, and stop when the remaining code has one clear reason to change.

## Code
```kotlin
// Step 1: data behind an interface.
class ArticleViewModel(private val repository: ArticleRepository) : ViewModel()

// Step 2: presentation state is a value.
data class ArticleUiState(val articles: List<Article> = emptyList())

// Step 3: rendering is separate.
@Composable
fun ArticleScreen(state: ArticleUiState, onRefresh: () -> Unit)
```
