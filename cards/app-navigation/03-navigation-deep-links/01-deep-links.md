---
id: navigation-deep-links
topic: app-navigation/deep-links
title: Deep links
tags: [navigation, deep-links, uri]
related: [navigation-implicit-vs-explicit-deep-links, navigation-testing-deep-links]
sources:
  - https://developer.android.com/guide/navigation/design/deep-link
---

## Explanation
A deep link is a URI that opens a specific destination, possibly from outside the app. With the Navigation component, declare a `deepLink` on a destination in the graph and add a matching intent filter to the activity in the manifest. The system resolves the URI, starts the activity, and Navigation builds the back stack so Back behaves as if the user arrived through the app. Arguments in the URI are parsed into the destination's arguments. Keep deep links stable, validate their arguments, and make sure a link never opens protected data without authentication.

## Code
```kotlin
@Serializable data class ArticleRoute(val id: String)

composable<ArticleRoute>(
    deepLinks = listOf(navDeepLink<ArticleRoute>(basePath = "https://example.com/article")),
) { entry ->
    ArticleDetailScreen(entry.toRoute<ArticleRoute>().id)
}
```
