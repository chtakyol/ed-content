---
id: navigation-actions-and-arguments
topic: app-navigation/graph
title: Actions and arguments
tags: [navigation, actions, arguments]
related: [navigation-destinations-and-routes, navigation-passing-data]
sources:
  - https://developer.android.com/guide/navigation/design/actions
---

## Explanation
An action describes a connection from one destination to another, optionally with arguments and navigation options such as `popUpTo`. Actions make the graph's allowed transitions explicit and keep navigation calls named rather than raw routes. Arguments are the values a destination needs, declared with a type and an optional default. In Compose, type-safe routes often replace string actions, because the route class itself carries the arguments. Use actions when you need graph-level transition metadata or the XML navigation editor; otherwise a direct typed `navigate(route)` is simpler.

## Code
```xml
<action
    android:id="@+id/action_list_to_detail"
    app:destination="@id/articleDetail"
    app:popUpTo="@id/articleList" />

<argument
    android:name="articleId"
    app:argType="string" />
```
