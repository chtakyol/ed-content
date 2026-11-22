---
id: activity-espresso-basics
topic: activities/testing
title: Espresso basics
tags: [activities, testing, espresso]
related: [activity-scenario, activity-testing-state-restoration]
sources:
  - https://developer.android.com/guide/components/activities/testing
---

## Explanation
Espresso drives UI interactions and assertions on the main thread, waiting for the app to become idle before each action. `onView(withId(...))` finds a view, `perform(click())` acts on it, and `check(matches(...))` verifies its state. Use view matchers that describe user-visible behavior rather than internal implementation details, and add idling resources for background work Espresso cannot see. For Compose screens, use the Compose test APIs instead of Espresso view matchers; both can coexist in an app that mixes Views and Compose.

## Code
```kotlin
@Test
fun searchFiltersArticles() {
    onView(withId(R.id.search))
        .perform(typeText("compose"), closeSoftKeyboard())

    onView(withText("Compose basics"))
        .check(matches(isDisplayed()))
}
```
