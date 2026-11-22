---
id: di-hilt-cheatsheet
topic: dependency-injection/hilt
title: Hilt cheatsheet
tags: [di, hilt, reference]
related: [di-hilt-overview, di-hilt-testing]
sources:
  - https://developer.android.com/training/dependency-injection/hilt-cheatsheet
---

## Explanation
The Hilt cheatsheet is a quick reference for the annotations you reach for most: `@HiltAndroidApp` on the application, `@AndroidEntryPoint` on framework entry points, `@HiltViewModel` on ViewModels, `@Inject` on constructors and fields, `@Module` plus `@InstallIn` for bindings, `@Provides` and `@Binds` for the two binding styles, and `@HiltAndroidTest` for tests. The component names and scope annotations are the other half of the reference. Keep the cheatsheet nearby while learning Hilt, then rely on compile errors and the generated graph to catch mistakes.

## Code
```text
@HiltAndroidApp        Application
@AndroidEntryPoint     Activity, Fragment, View, Service
@HiltViewModel         ViewModel
@Inject                constructor / field
@Module @InstallIn     binding module
@Provides / @Binds     instance / interface mapping
@HiltAndroidTest       test component
```
