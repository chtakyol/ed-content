---
id: activity-testing-state-restoration
topic: activities/testing
title: Testing state restoration
tags: [activities, testing, saved-state]
related: [activity-saving-instance-state, activity-process-death-and-restoration]
sources:
  - https://developer.android.com/guide/components/activities/testing
---

## Explanation
State restoration is easy to break and hard to notice, so test it explicitly. Use `ActivityScenario.recreate()` to simulate a configuration change and assert that the visible state comes back. To test process death, save the state, finish the activity, and relaunch with the saved bundle, or use the framework's saved-state testing helpers. Check the cases users hit: a draft query, a selected tab, a scroll position, and an in-flight screen rebuilt from an id. A passing recreation test is a strong signal that the screen does not depend on in-memory objects.

## Code
```kotlin
@Test
fun querySurvivesRecreation() {
    ActivityScenario.launch(SearchActivity::class.java).use { scenario ->
        scenario.onActivity { it.findViewById<EditText>(R.id.search).setText("compose") }
        scenario.recreate()
        scenario.onActivity {
            assertEquals("compose", it.findViewById<EditText>(R.id.search).text.toString())
        }
    }
}
```
