---
id: navigation-testing-deep-links
topic: app-navigation/deep-links
title: Testing deep links
tags: [navigation, deep-links, testing]
related: [navigation-deep-links, navigation-navhost-and-destinations]
sources:
  - https://developer.android.com/guide/navigation/design/deep-link
---

## Explanation
Test deep links at two levels: the URI reaches the right destination with the right arguments, and the resulting back stack behaves correctly. A `TestNavHostController` lets a UI test inspect the current destination and arguments without launching an external app, and instrumentation tests can use `NavigationTestRule` for fragment-based graphs. You can also exercise real links from a terminal with `adb shell am start -a android.intent.action.VIEW -d "..."` to verify the manifest filter. Cover invalid arguments and unauthenticated users, because those paths are easy to forget.

## Code
```kotlin
@Test
fun articleLinkOpensDetail() {
    val intent = Intent(
        Intent.ACTION_VIEW,
        Uri.parse("https://example.com/article/42"),
    ).setClass(context, MainActivity::class.java)

    ActivityScenario.launch<MainActivity>(intent).use { scenario ->
        scenario.onActivity { activity ->
            assertEquals(
                "article/{id}",
                activity.navController.currentDestination?.route,
            )
        }
    }
}
```
