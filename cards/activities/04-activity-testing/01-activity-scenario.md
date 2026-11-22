---
id: activity-scenario
topic: activities/testing
title: Testing activities with ActivityScenario
tags: [activities, testing, activityscenario]
related: [activity-espresso-basics, activity-testing-state-restoration]
sources:
  - https://developer.android.com/guide/components/activities/testing
---

## Explanation
`ActivityScenario` launches an activity in a test, drives it through lifecycle states, and closes it deterministically. `launch` starts the activity, `moveToState` moves it to `CREATED`, `STARTED`, or `RESUMED`, and `recreate` simulates a configuration change. It works on device and is the foundation for instrumented tests that need a real activity. Use `ActivityScenarioRule` to launch before each test, and prefer testing observable UI behavior over reaching into activity fields.

## Code
```kotlin
@RunWith(AndroidJUnit4::class)
class ArticleActivityTest {
    @Test
    fun showsTitle() {
        ActivityScenario.launch(ArticleActivity::class.java).use { scenario ->
            scenario.onActivity { activity ->
                assertEquals("Compose", activity.title.toString())
            }
        }
    }
}
```
