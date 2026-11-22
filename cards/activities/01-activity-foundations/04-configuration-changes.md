---
id: activity-configuration-changes
topic: activities/foundations
title: Configuration changes
tags: [activities, lifecycle, configuration]
related: [activity-saving-instance-state, architecture-config-change-vs-process-death]
sources:
  - https://developer.android.com/guide/components/activities/state-changes
---

## Explanation
A configuration change such as rotation, locale, theme, or keyboard availability recreates the activity by default. The system calls `onDestroy` and then `onCreate` again, so fields reset and UI must be rebuilt from saved state. A `ViewModel` survives the recreation, which is the usual place for screen data and in-flight work. `rememberSaveable` and `onSaveInstanceState` cover small UI state such as a query or scroll position. You can declare `configChanges` to handle a change yourself, but that shifts the responsibility to you and is rarely the simplest choice.

## Code
```kotlin
class ArticleActivity : ComponentActivity() {
    private val viewModel: ArticleViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // A new Activity instance, but the same ViewModel.
        setContent { ArticleScreen(viewModel) }
    }
}
```
