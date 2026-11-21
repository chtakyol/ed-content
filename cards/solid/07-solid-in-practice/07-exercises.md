---
id: solid-exercises
topic: solid/practice
title: Exercises
tags: [solid, practice, exercises]
related: [solid-refactoring-a-screen, solid-code-review-checklist]
sources:
  - https://developer.android.com/topic/architecture/recommendations
---

## Explanation
Practice each principle on a small, familiar screen rather than a greenfield project. Take a screen with a ViewModel that loads data, formats a date, and logs analytics, then extract one collaborator at a time and note which constructor changed. Replace a boolean-flag UI state with a sealed hierarchy and observe where the compiler forces updates. Write a contract test for a repository interface and run it against both the real and fake implementations. Add a new sort option through a strategy instead of an `if` branch. Finally, review the result and remove any abstraction that no caller or test actually needed.

## Code
```text
1. Extract one responsibility from a god ViewModel.
2. Replace a flags-based UI state with a sealed interface.
3. Write a contract test for a repository and its fake.
4. Add a sort option as a strategy, not a branch.
5. Audit the result: delete unused abstractions.
```
