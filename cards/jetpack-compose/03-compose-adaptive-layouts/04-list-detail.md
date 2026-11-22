---
id: compose-list-detail
topic: jetpack-compose/adaptive-layouts
title: List-detail layouts
tags: [compose, adaptive, list-detail]
related: [compose-responsive-layouts, compose-adaptive-apps]
sources:
  - https://developer.android.com/develop/ui/compose/build-adaptive-apps
---

## Explanation
A list-detail layout shows a list and a selected item side by side when there is room, and navigates between them when there is not. This is a canonical adaptive pattern because it preserves context on large screens while keeping the phone flow familiar. Material 3's `ListDetailPaneScaffold` handles the pane arrangement, back behavior, and selection state, so you provide the list and detail content plus the selected item. Keep selection in a state holder or navigation argument so it survives configuration changes and can be restored.

## Code
```kotlin
@Composable
fun ArticleListDetail(windowAdaptiveInfo: WindowAdaptiveInfo) {
    val scaffoldState = rememberListDetailPaneScaffoldState()

    ListDetailPaneScaffold(
        directive = ListDetailPaneScaffoldDefaults
            .calculatePaneScaffoldDirective(windowAdaptiveInfo),
        scaffoldState = scaffoldState,
        listPane = { ArticleList(onSelect = { id -> /* select */ }) },
        detailPane = { ArticleDetail(selectedId) },
    )
}
```
