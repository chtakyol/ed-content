---
id: activity-what-is-an-activity
topic: activities/foundations
title: What is an Activity?
tags: [activities, android, components]
related: [activity-activity-lifecycle, architecture-app-components]
sources:
  - https://developer.android.com/guide/components/activities/intro-activities
---

## Explanation
An Activity is a single, focused thing a user can do, and it is the entry point through which the system launches an app screen. It owns a window, receives lifecycle callbacks, and hosts a UI, whether that UI is a View hierarchy or a Compose tree. Activities are declared in the manifest, can be started explicitly or implicitly, and can be recreated by the system at any time. Modern apps often use a small number of activities, sometimes just one, and let composables or navigation destinations handle the screen-to-screen flow.

## Code
```kotlin
class ArticleActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ArticleScreen()
        }
    }
}
```
