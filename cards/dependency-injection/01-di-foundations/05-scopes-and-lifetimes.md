---
id: di-scopes-and-lifetimes
topic: dependency-injection/foundations
title: Scopes and lifetimes
tags: [di, scopes, lifecycle]
related: [di-hilt-scopes, di-manual-di]
sources:
  - https://developer.android.com/training/dependency-injection
---

## Explanation
A scope decides how long a dependency instance lives and how widely it is shared. An application-scoped singleton is created once per process; an activity-scoped object lives as long as the activity; a ViewModel-scoped object lasts for the ViewModel. A dependency should not outlive the things it references: a singleton holding an Activity leaks it, while a screen-scoped object that should be shared across screens is recreated too often. DI frameworks encode these lifetimes as annotations, but the same reasoning applies to manual containers.

## Code
```text
@Singleton          one per process
@ActivityScoped     one per Activity
@ViewModelScoped    one per ViewModel
unscoped            a new instance per injection
```
