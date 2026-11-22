---
id: activity-handling-back
topic: activities/tasks
title: Handling Back
tags: [activities, back, predictive-back]
related: [activity-tasks-and-back-stack, navigation-principles]
sources:
  - https://developer.android.com/guide/components/activities/tasks-and-back-stack
---

## Explanation
Back is a system gesture and a button, and it should move the user to the previous place or close the current surface. In modern Android, handle it with `OnBackPressedDispatcher` and an `OnBackPressedCallback`; the old `onBackPressed()` override is deprecated. Enable the callback only while it should intercept, and disable it when the state no longer applies. With Compose, `BackHandler` wraps the same mechanism, and navigation libraries register their own callbacks. Support predictive back by keeping the callback lightweight and by not intercepting gestures you cannot preview.

## Code
```kotlin
class EditorActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        onBackPressedDispatcher.addCallback(this) {
            if (hasUnsavedChanges) showDiscardDialog()
            else finish()
        }
    }
}
```
